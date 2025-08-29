import { Routes } from '@angular/router';
import { Auth } from './features/auth/auth';
import { LoginForm } from './features/auth/login-form/login-form';
import { RegisterForm } from './features/auth/register-form/register-form';
import { Home } from './features/home/home';

export const routes: Routes = [
  { path: '', component: Home },

  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: LoginForm },
      { path: 'register', component: RegisterForm },
      { path: '', redirectTo: 'login', pathMatch: 'full' } 
    ]
  },

  { path: '**', redirectTo: '' } // 👈 cualquier ruta inválida → Home
];
