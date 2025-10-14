import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesService, Cliente } from '../../services/clientes';
// Imports de Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
// Diálogos
import { ClienteDialog } from '../../components/cliente-dialog/cliente-dialog';
import { ConfirmDialog } from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-lista-clientes',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './lista-clientes.html',
  styleUrl: './lista-clientes.scss',
})
export class ListaClientes {
  private clientesService = inject(ClientesService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['nombre', 'nro_doc', 'email', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarClientes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarClientes(): void {
    this.clientesService.getClientes().subscribe({
      next: (response) => {
        this.dataSource.data = (response.data as Cliente[]) || [];
      },
      error: (err) => this.openSnackBar(`❌ Error al cargar clientes: ${err.message}`),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openClienteDialog(cliente?: Cliente): void {
    const dialogRef = this.dialog.open(ClienteDialog, {
      width: '450px',
      data: { cliente },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const operation$ = cliente
          ? this.clientesService.updateCliente(cliente.id, result)
          : this.clientesService.createCliente(result);

        operation$.subscribe({
          next: () => {
            this.openSnackBar(`✔️ Cliente ${cliente ? 'actualizado' : 'creado'} correctamente`);
            this.cargarClientes();
          },
          error: (err) => this.openSnackBar(`❌ Error al guardar: ${err.message}`),
        });
      }
    });
  }

  eliminarCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: { title: 'Confirmar Eliminación', message: `¿Eliminar a "${cliente.nombre}"?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.clientesService.deleteCliente(cliente.id).subscribe({
          next: () => {
            this.openSnackBar('✔️ Cliente eliminado correctamente');
            this.cargarClientes();
          },
          error: (err) => this.openSnackBar(`❌ Error al eliminar: ${err.message}`),
        });
      }
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', { duration: 3000 });
  }
}
