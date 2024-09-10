import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./components/layout/main.page/main.page.component').then(m => m.MainPageComponent) }
];
