import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { Incomes } from './pages/incomes/incomes';
import { Expenses } from './pages/expenses/expenses';
import { Goals } from './pages/goals/goals';
import { Reports } from './pages/reports/reports';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'incomes', component: Incomes },
      { path: 'expenses', component: Expenses },
      { path: 'goals', component: Goals },
      { path: 'reports', component: Reports },
      { path: 'profile', component: Profile },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
