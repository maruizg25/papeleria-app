import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase = inject(SupabaseService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = environment.apiUrl;

  // Usamos un BehaviorSubject para tener siempre un valor inicial
  private currentUser = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor() {
    // 1. Al iniciar el servicio, intentamos obtener la sesión actual
    this.supabase.client.auth.getSession().then(({ data: { session } }) => {
      this.currentUser.next(session?.user ?? null);
    });

    // 2. Nos suscribimos a futuros cambios en la autenticación
    this.supabase.client.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event, session); // <-- Log para depurar
      this.currentUser.next(session?.user ?? null);
    });
  }

  async signInWithPassword(credentials: { email: string; password: string }): Promise<void> {
    const { data, error } = await this.supabase.client.auth.signInWithPassword(credentials);
    if (error) throw error;
    if (!data.session) throw new Error('No se pudo iniciar sesión.');

    // Llamamos al backend para asegurar el perfil
    await this.bootstrapBackendProfile(data.session.access_token);
  }

  private async bootstrapBackendProfile(token: string): Promise<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/bootstrap`, {}, { headers }));
    } catch (err) {
      await this.signOut(); // Si el backend falla, cerramos sesión para evitar inconsistencias
      throw new Error('Error al sincronizar el perfil con el servidor.');
    }
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) throw error;
    this.router.navigate(['/login']);
  }
}
