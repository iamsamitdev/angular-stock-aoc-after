import { Routes } from '@angular/router'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { StockComponent } from './components/stock/stock.component'

// Auth Guard
import { authenGuard } from './auth/auth.guard'
import { DashboardComponent } from './components/dashboard/dashboard.component'

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [authenGuard], 
    data: { title: 'Login' } 
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    canActivate: [authenGuard],
    data: { title: 'Register' }
  },
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [authenGuard],
    data: { title: 'Dashboard' }
  },
  { 
    path: 'stock', 
    component: StockComponent, 
    canActivate: [authenGuard],
    data: { title: 'Stock' }
  },
  { path: '**', redirectTo: 'login' }, // undefined pages
]