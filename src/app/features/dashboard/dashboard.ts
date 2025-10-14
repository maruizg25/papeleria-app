import { Component, inject } from '@angular/core';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { DashboardService, StatsDiarias } from './services/dashboard';
import { SucursalService } from '../../core/services/sucursal.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatListModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);
  private sucursalService = inject(SucursalService);

  stats$!: Observable<StatsDiarias>;
  topProductos$!: Observable<{ nombre: string; total_vendido: number }[]>; // <-- Propiedad nueva

  ngOnInit(): void {
    // Corrected Logic:
    this.stats$ = this.sucursalService.sucursalActiva$.pipe(
      // 1. Wait until the active branch is not null
      filter((sucursal) => sucursal !== null),
      // 2. Once we have a branch, switch to the dashboard service call
      switchMap((sucursal) => {
        if (sucursal) {
          return this.dashboardService
            .getStatsDelDia(sucursal.id)
            .pipe(map((response) => response.data || { numero_de_ventas: 0, total_vendido: 0 }));
        } else {
          // Provide a default value if there's no branch for some reason
          return of({ numero_de_ventas: 0, total_vendido: 0 });
        }
      })
    );

    // This part was already correct
    this.topProductos$ = this.dashboardService
      .getTopProductosVendidos()
      .pipe(map((response) => response.data || []));
  }
}
