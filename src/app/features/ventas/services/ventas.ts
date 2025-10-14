import { Injectable, inject } from '@angular/core';
import { SupabaseService } from '../../../core/services/supabase.service';
import { VentaItem } from '../pages/pos/pos';
import { from } from 'rxjs';

export interface VentaPayload {
  sucursalId: string;
  clienteId: string | null;
  items: {
    producto_id: number;
    cantidad: number;
    precio_unitario: number;
  }[];
}

export interface RegistrarPago {
  monto: number;
  metodo: 'EFECTIVO' | 'TARJETA' | 'TRANSFERENCIA' | 'MIXTO';
  referencia?: string;
}

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private supabase = inject(SupabaseService);

  /**
   * Llama a la función RPC 'fn_registrar_venta' en Supabase
   * para crear una venta y todos sus detalles en una sola transacción.
   */
  async crearVenta(ventaData: VentaPayload): Promise<string> {
    // 1. Obtenemos el ID del usuario actual para el campo 'creado_por'
    const {
      data: { user },
    } = await this.supabase.client.auth.getUser();
    if (!user) throw new Error('Usuario no autenticado.');

    // 2. Llamamos a la función RPC con los parámetros correctos
    const { data, error } = await this.supabase.client.rpc('fn_registrar_venta', {
      p_sucursal_id: ventaData.sucursalId,
      p_cliente_id: ventaData.clienteId ?? null,
      p_items: ventaData.items,
      p_creado_por: user.id,
    });

    if (error) {
      console.error('Error en RPC fn_registrar_venta:', error);
      throw error;
    }

    return data;
  }

  async registrarPago(ventaId: string, pago: RegistrarPago): Promise<any> {
    const {
      data: { user },
    } = await this.supabase.client.auth.getUser();
    if (!user) throw new Error('Usuario no autenticado.');

    const { data, error } = await this.supabase.client.rpc('fn_registrar_pago', {
      p_venta_id: ventaId,
      p_monto: pago.monto,
      p_metodo: pago.metodo,
      p_referencia: pago.referencia ?? null,
      p_creado_por: user.id,
    });

    if (error) {
      console.error('Error en RPC fn_registrar_pago:', error);
      throw error;
    }
    return data;
  }

  async actualizarEstadoVenta(
    ventaId: string,
    nuevoEstado: 'CONFIRMADA' | 'ANULADA'
  ): Promise<any> {
    const { data, error } = await this.supabase.client
      .from('ventas')
      .update({ estado: nuevoEstado })
      .eq('id', ventaId);

    if (error) {
      console.error('Error al actualizar estado de la venta:', error);
      throw error;
    }
    return data;
  }

  async finalizarVenta(payload: any): Promise<string> {
    const {
      data: { user },
    } = await this.supabase.client.auth.getUser();
    if (!user) throw new Error('User not authenticated.');

    const { data, error } = await this.supabase.client.rpc('fn_finalizar_venta', {
      p_sucursal_id: payload.sucursalId,
      p_items: payload.items,
      p_pago: payload.pago, // This parameter is crucial
      p_cliente_id: payload.clienteId || null,
      p_creado_por: user.id,
    });

    if (error) {
      console.error('Error in RPC fn_finalizar_venta:', error);
      throw error;
    }
    return data;
  }

  /**
   * This method is for viewing a receipt AFTER the sale is created.
   */
  async obtenerDetalleVenta(ventaId: string) {
    const { data, error } = await this.supabase.client
      .from('ventas')
      .select(
        `*, cliente:clientes(*), ventas_detalle:ventas_detalle(*, producto:productos(nombre, sku))`
      )
      .eq('id', ventaId)
      .single();

    if (error) {
      console.error('Error getting sale details:', error);
      throw error;
    }
    return data;
  }

  getHistorialVentas() {
    return from(
      this.supabase.client
        .from('ventas')
        .select(
          `
          id,
          numero,
          fecha_emision,
          total_general,
          estado_pago,
          cliente:clientes(nombre)
        `
        )
        .eq('estado', 'CONFIRMADA') // Solo ventas confirmadas
        .order('numero', { ascending: false }) // Las más recientes primero
    );
  }
}
