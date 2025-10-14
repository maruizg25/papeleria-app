import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, filter, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    // 1. Filtra: Espera hasta que el valor sea definido (no undefined)
    filter((user) => user !== undefined),
    // 2. Toma solo el primer valor definitivo
    take(1),
    // 3. Decide si permitir el acceso
    map((user) => {
      if (user) {
        return true; // Usuario logueado, permite el acceso
      } else {
        router.navigate(['/login']); // No logueado, redirige a login
        return false;
      }
    })
  );
};
