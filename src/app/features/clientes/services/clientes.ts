import { Injectable, inject } from '@angular/core';
import { from } from 'rxjs';
import { SupabaseService } from '../../../core/services/supabase.service';

export interface Cliente {
  id: string;
  nombre: string;
  nro_doc: string;
  email: string | null;
  telefono: string | null;
  direccion: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private supabase = inject(SupabaseService);

  getClientes() {
    return from(this.supabase.client.from('clientes').select('*').order('nombre'));
  }

  createCliente(cliente: Partial<Cliente>) {
    return from(this.supabase.client.from('clientes').insert(cliente).select().single());
  }

  updateCliente(id: string, cliente: Partial<Cliente>) {
    return from(
      this.supabase.client.from('clientes').update(cliente).eq('id', id).select().single()
    );
  }

  deleteCliente(id: string) {
    return from(this.supabase.client.from('clientes').delete().eq('id', id));
  }

  getConsumidorFinal() {
    return from(
      this.supabase.client.from('clientes').select('*').eq('nro_doc', '9999999999').single() // Esperamos solo un resultado
    );
  }
}
