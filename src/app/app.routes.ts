import { Routes } from '@angular/router';
import { AuthGuard, LoginGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./modules/auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [LoginGuard] 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./modules/home/home.component').then(m => m.HomeComponent),
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/home' }
];