import { Component, inject, ViewChild } from '@angular/core';
import { VentasService } from '../../services/ventas';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial-ventas',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],

  templateUrl: './historial-ventas.html',
  styleUrl: './historial-ventas.scss',
})
export class HistorialVentas {
  private ventasService = inject(VentasService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  displayedColumns: string[] = [
    'numero',
    'fecha_emision',
    'cliente',
    'total_general',
    'estado_pago',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.cargarHistorial();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  cargarHistorial(): void {
    this.ventasService.getHistorialVentas().subscribe({
      next: (response) => {
        this.dataSource.data = response.data || [];
      },
      error: (err) =>
        this.snackBar.open(`❌ Error al cargar el historial: ${err.message}`, 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // Personalizar el filtro para buscar en el objeto anidado 'cliente'
    this.dataSource.filterPredicate = (data, filter) => {
      const dataStr = data.numero + data.cliente?.nombre.toLowerCase() + data.total_general;
      return dataStr.includes(filter);
    };
  }

  verRecibo(ventaId: string): void {
    this.router.navigate(['/app/venta', ventaId]);
  }
}
