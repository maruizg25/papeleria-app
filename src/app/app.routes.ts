import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/main-layout/main-layout').then((m) => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'inventario',
        loadComponent: () =>
          import('./features/inventario/pages/lista-productos/lista-productos').then(
            (m) => m.ListaProductos
          ),
      },
      {
        path: 'ventas',
        loadComponent: () => import('./features/ventas/pages/pos/pos').then((m) => m.Pos),
      },
      {
        path: 'venta/:id',
        loadComponent: () =>
          import('./features/ventas/pages/ticket-venta/ticket-venta').then((m) => m.TicketVenta),
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./features/clientes/pages/lista-clientes/lista-clientes').then(
            (m) => m.ListaClientes
          ),
      },
      {
        path: 'historial',
        loadComponent: () =>
          import('./features/ventas/pages/historial-ventas/historial-ventas').then(
            (m) => m.HistorialVentas
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
