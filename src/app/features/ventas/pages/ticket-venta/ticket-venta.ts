import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from '../../services/ventas';
import { Observable, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ticket-venta',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './ticket-venta.html',
  styleUrl: './ticket-venta.scss',
})
export class TicketVenta {
  private route = inject(ActivatedRoute);
  private ventasService = inject(VentasService);

  public venta$!: Observable<any>;

  ngOnInit(): void {
    this.venta$ = this.route.paramMap.pipe(
      // Obtenemos el 'id' de la URL y llamamos al servicio
      switchMap((params) => {
        const ventaId = params.get('id');
        if (ventaId) {
          return this.ventasService.obtenerDetalleVenta(ventaId);
        }
        // Devuelve un observable vacío si no hay ID
        return new Observable((sub) => sub.complete());
      })
    );
  }

  // Función para imprimir
  imprimirTicket(): void {
    window.print();
  }
}
