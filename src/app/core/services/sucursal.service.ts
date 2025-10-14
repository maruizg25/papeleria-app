import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';

// Interfaz para tipar los datos de una sucursal
export interface Sucursal {
  id: string;
  codigo: string;
  nombre: string;
  direccion: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class SucursalService {
  private supabase = inject(SupabaseService);

  // BehaviorSubject para mantener la lista de todas las sucursales
  private _sucursales$ = new BehaviorSubject<Sucursal[]>([]);
  public sucursales$ = this._sucursales$.asObservable();

  // BehaviorSubject para mantener solo la sucursal activa
  public sucursalActiva$ = new BehaviorSubject<Sucursal | null>(null);

  constructor() {
    this.cargarSucursales();
  }

  private async cargarSucursales(): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('sucursales')
      .select('*')
      .order('nombre');

    if (error) {
      console.error('Error al cargar sucursales:', error);
      return;
    }

    const sucursales = data || [];
    this._sucursales$.next(sucursales);

    // Si hay sucursales, establece la primera como la activa por defecto
    if (sucursales.length > 0) {
      this.sucursalActiva$.next(data[0]);
    }
  }

  // En el futuro, podríamos tener un método para cambiar la sucursal
  // cambiarSucursalActiva(sucursalId: string) { ... }
}
