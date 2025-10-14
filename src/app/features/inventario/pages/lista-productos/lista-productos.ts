import { Component, inject } from '@angular/core';
import { Producto, ProductosService } from '../../services/productos.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ProductoDialog } from '../../components/producto-dialog/producto-dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';
@Component({
  selector: 'app-lista-productos',
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.scss',
})
export class ListaProductos {
  private productosService = inject(ProductosService);

  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  // Usamos un BehaviorSubject para poder refrescar la tabla cuando queramos
  private refresh$ = new BehaviorSubject<void>(undefined);

  // Creamos una variable para guardar los productos
  public productos$!: Observable<Producto[]>;

  // Definimos las columnas que mostraremos en la tabla
  public displayedColumns: string[] = ['sku', 'nombre', 'precio', 'costo', 'acciones'];

  ngOnInit(): void {
    // Cuando el componente se inicia, llamamos al servicio
    this.productos$ = this.refresh$.pipe(
      // Cada vez que refresh$ emita un valor, se llamará a getProductos
      switchMap(() => this.productosService.getProductos()),
      map((response) => (response.data as Producto[]) || [])
    );
  }

  openProductoDialog(producto?: Producto): void {
    const dialogRef = this.dialog.open(ProductoDialog, {
      width: '450px',
      data: { producto },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const operation$ = producto
          ? this.productosService.updateProducto(producto.id, result) // Si hay producto, actualiza
          : this.productosService.createProducto(result); // Si no, crea

        operation$.subscribe({
          next: () => {
            // --- AÑADE ESTA NOTIFICACIÓN ---
            this.openSnackBar(`✔️ Producto ${producto ? 'actualizado' : 'creado'} correctamente`);
            this.refresh$.next(); // Refresca la tabla
          },
          error: (err) => {
            // --- AÑADE ESTA NOTIFICACIÓN DE ERROR ---
            this.openSnackBar(`❌ Error al guardar el producto: ${err.message}`);
          },
        });
      }
    });
  }

  eliminarProducto(producto: Producto): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar el producto "${producto.nombre}"?`,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.productosService.deleteProducto(producto.id).subscribe({
          next: () => {
            this.openSnackBar('✔️ Producto eliminado correctamente');
            this.refresh$.next(); // Refresca la tabla
          },
          error: (err) => {
            this.openSnackBar(`❌ Error al eliminar el producto: ${err.message}`);
          },
        });
      }
    });
  }

  // --- AÑADE ESTE MÉTODO PARA LAS NOTIFICACIONES ---
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000, // Duración en milisegundos
    });
  }
}
