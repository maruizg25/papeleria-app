import { Injectable, inject } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase.service';

// Interfaz para los datos que esperamos
export interface StatsDiarias {
  numero_de_ventas: number;
  total_vendido: number;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private supabase = inject(SupabaseService);

  getStatsDelDia(sucursalId: string) {
    return from(
      this.supabase.client
        .from('v_reporte_ventas_diarias')
        .select('numero_de_ventas, total_vendido')
        .eq('sucursal_id', sucursalId)
        .single() // Esperamos solo una fila por sucursal
    );
  }

  getTopProductosVendidos() {
    return from(
      this.supabase.client.from('v_productos_mas_vendidos_hoy').select('nombre, total_vendido')
    );
  }
}
