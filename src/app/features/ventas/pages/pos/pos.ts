import { Component, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Producto, ProductosService } from '../../../inventario/services/productos.service';
import { VentasService, RegistrarPago, VentaPayload } from '../../services/ventas';
import { SucursalService } from '../../../../core/services/sucursal.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, map, Observable, startWith, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { PagoDialog } from '../../components/pago-dialog/pago-dialog';
import { Router } from '@angular/router';
import { Cliente, ClientesService } from '../../../clientes/services/clientes';

export interface VentaItem extends Producto {
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-pos',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    MatSnackBarModule,
  ],
  templateUrl: './pos.html',
  styleUrl: './pos.scss',
})
export class Pos {
  private productosService = inject(ProductosService);
  private ventasService = inject(VentasService);
  private sucursalService = inject(SucursalService);
  private clientesService = inject(ClientesService);
  private snackBar = inject(MatSnackBar);
  private cdr = inject(ChangeDetectorRef);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  displayedColumns: string[] = ['producto', 'cantidad', 'subtotal', 'acciones'];

  searchControl = new FormControl('');
  filteredProductos$!: Observable<Producto[]>;

  isLoading = signal(false);

  // Estado de la venta actual
  currentSaleItems: VentaItem[] = [];
  totalVenta = 0;

  clienteSearchControl = new FormControl({ value: '', disabled: true }); // Empieza deshabilitado
  filteredClientes$!: Observable<Cliente[]>;
  clienteSeleccionado: Cliente | null = null;

  ngOnInit(): void {
    this.filteredProductos$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300), // Espera 300ms después de que el usuario deja de teclear
      switchMap((value) => this._filter(value || ''))
    );
    this.clientesService.getConsumidorFinal().subscribe((response) => {
      if (response.data) {
        this.clienteSeleccionado = response.data;
        this.clienteSearchControl.setValue(this.clienteSeleccionado?.nombre ?? null);
      }
    });

    this.filteredClientes$ = this.clienteSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((value) => this._filterClientes(value || ''))
    );
  }

  // Lógica para filtrar productos en la búsqueda
  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    // Aquí llamaríamos a un método del servicio que busque en la BD.
    // Por ahora, simulamos una búsqueda simple sobre la lista completa.
    return this.productosService.getProductos().pipe(
      map((response) => {
        const productos = (response.data as Producto[]) || [];
        return productos.filter(
          (producto) =>
            producto.nombre.toLowerCase().includes(filterValue) ||
            producto.sku?.toLowerCase().includes(filterValue)
        );
      })
    );
  }

  // Se ejecuta cuando se selecciona un producto del autocompletado
  onProductSelected(producto: Producto): void {
    this.agregarProductoAVenta(producto);
    this.searchControl.setValue(''); // Limpia el campo de búsqueda
  }

  agregarProductoAVenta(producto: Producto): void {
    const itemExistente = this.currentSaleItems.find((item) => item.id === producto.id);
    const IVA_RATE = 1.12; // 12% de IVA

    if (itemExistente) {
      this.currentSaleItems = this.currentSaleItems.map((item) =>
        item.id === producto.id
          ? {
              ...item,
              cantidad: item.cantidad + 1,
              subtotal: parseFloat(((item.cantidad + 1) * item.precio * IVA_RATE).toFixed(2)),
            }
          : item
      );
    } else {
      const nuevoItem: VentaItem = {
        ...producto,
        cantidad: 1,
        subtotal: parseFloat((producto.precio * IVA_RATE).toFixed(2)),
      };
      this.currentSaleItems = [...this.currentSaleItems, nuevoItem];
    }
    this.calcularTotal();
  }

  incrementarCantidad(itemAActualizar: VentaItem): void {
    const IVA_RATE = 1.12;
    this.currentSaleItems = this.currentSaleItems.map((item) =>
      item.id === itemAActualizar.id
        ? {
            ...item,
            cantidad: item.cantidad + 1,
            subtotal: parseFloat(((item.cantidad + 1) * item.precio * IVA_RATE).toFixed(2)),
          }
        : item
    );
    this.calcularTotal();
  }

  decrementarCantidad(itemAActualizar: VentaItem): void {
    const IVA_RATE = 1.12;
    if (itemAActualizar.cantidad > 1) {
      this.currentSaleItems = this.currentSaleItems.map((item) =>
        item.id === itemAActualizar.id
          ? {
              ...item,
              cantidad: item.cantidad - 1,
              subtotal: parseFloat(((item.cantidad - 1) * item.precio * IVA_RATE).toFixed(2)),
            }
          : item
      );
      this.calcularTotal();
    } else {
      this.eliminarItem(itemAActualizar.id);
    }
  }

  eliminarItem(productoId: number): void {
    this.currentSaleItems = this.currentSaleItems.filter((item) => item.id !== productoId);
    this.calcularTotal();
  }

  calcularTotal(): void {
    const total = this.currentSaleItems.reduce((acc, item) => acc + item.subtotal, 0);
    // Redondea el total final a 2 decimales
    this.totalVenta = parseFloat(total.toFixed(2));
  }

  cancelarVenta(): void {
    this.currentSaleItems = [];
    this.totalVenta = 0;
  }

  finalizarVenta(): void {
    if (this.currentSaleItems.length === 0) {
      return;
    }

    // 1. Abrimos el diálogo de pago y le pasamos el total
    const dialogRef = this.dialog.open(PagoDialog, {
      width: '400px',
      data: { total: this.totalVenta },
      disableClose: true, // Evita que se cierre haciendo clic fuera
    });

    // 2. Nos suscribimos al resultado cuando el diálogo se cierra
    dialogRef.afterClosed().subscribe(async (pagoInfo: RegistrarPago) => {
      // Si el usuario confirmó el pago (no presionó "Cancelar")
      if (pagoInfo) {
        this.isLoading.set(true);
        let ventaExitosa = false;
        this.cdr.detectChanges(); // Actualiza la vista para mostrar el spinner

        try {
          const sucursalActiva = this.sucursalService.sucursalActiva$.getValue();
          if (!sucursalActiva) {
            throw new Error('No se ha seleccionado una sucursal.');
          }

          // Prepare the complete payload in one object
          const payload: VentaPayload & { pago: RegistrarPago } = {
            sucursalId: sucursalActiva.id,
            clienteId: this.clienteSeleccionado?.id || null,
            items: this.currentSaleItems.map((item) => ({
              producto_id: item.id,
              cantidad: item.cantidad,
              precio_unitario: item.precio,
            })),
            pago: {
              monto: pagoInfo.monto,
              metodo: pagoInfo.metodo,
              referencia: pagoInfo.referencia,
            },
          };

          // ADD THIS CONSOLE LOG
          console.log('Sending payload to service:', payload);

          // Call the single master function
          const ventaId = await this.ventasService.finalizarVenta(payload);

          this.router.navigate(['/app/venta', ventaId]);

          this.openSnackBar('✔️ Venta y pago registrados exitosamente');
          ventaExitosa = true;
        } catch (error: any) {
          this.openSnackBar(`❌ Error al procesar la venta: ${error.message}`);
        } finally {
          this.isLoading.set(false);
          if (ventaExitosa) {
            this.cancelarVenta();
          }
          this.cdr.detectChanges(); // Actualiza la vista para quitar el spinner y vaciar el carrito
        }
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }

  private _filterClientes(value: string): Observable<Cliente[]> {
    const filterValue = value.toLowerCase();
    return this.clientesService.getClientes().pipe(
      map((response) => {
        const clientes = (response.data as Cliente[]) || [];
        return clientes.filter((cliente) => cliente.nombre.toLowerCase().includes(filterValue));
      })
    );
  }

  onClienteSelected(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.clienteSearchControl.setValue(this.clienteSeleccionado.nombre);
    this.clienteSearchControl.disable(); // Deshabilita el campo de nuevo
  }

  cambiarCliente(): void {
    this.clienteSearchControl.enable();
    this.clienteSearchControl.setValue('');
  }
}
