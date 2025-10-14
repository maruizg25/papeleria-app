import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <-- 1. Import HttpClient
import { from } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase.service';
import { environment } from '../../../../environments/environment'; // <-- Import environment

export interface Producto {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
  costo: number;
  categoria_id?: string;
  unidad_id?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
}

export interface Unidad {
  id: string;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private supabase = inject(SupabaseService);
  private http = inject(HttpClient); // <-- 2. Inject HttpClient
  private apiUrl = environment.apiUrl; // <-- Get API URL from environment

  // This method stays the same for now, as there's no backend endpoint for it yet
  getProductos() {
    const query = this.supabase.client
      .from('productos')
      .select('id, sku, nombre, precio, costo, categoria_id, unidad_id')
      .order('nombre', { ascending: true });
    return from(query);
  }

  createProducto(producto: Partial<Producto>) {
    const query = this.supabase.client.from('productos').insert(producto);
    return from(query);
  }

  // Actualiza un producto existente
  updateProducto(id: number, producto: Partial<Producto>) {
    const query = this.supabase.client.from('productos').update(producto).eq('id', id);
    return from(query);
  }

  deleteProducto(id: number) {
    return from(this.supabase.client.from('productos').delete().eq('id', id));
  }

  getCategorias() {
    const query = this.supabase.client.from('categorias').select('id, nombre');
    return from(query);
  }

  getUnidades() {
    const query = this.supabase.client.from('unidades').select('id, nombre');
    return from(query);
  }

  // Example of how we would call your 'ajuste' endpoint in the future
  ajustarStock(ajusteData: any) {
    // Note: We would need to handle the authorization header
    return this.http.post(`${this.apiUrl}/inventario/ajuste`, ajusteData);
  }
}
