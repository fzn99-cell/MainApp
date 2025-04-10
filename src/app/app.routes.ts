import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'calculator',
    loadChildren: () => import('./Calculator/app.routes').then(m => m.routes)
  },
  {
    path: 'weather',
    loadChildren: () => import('./WeatherApp/app.routes').then(m => m.routes)
  },
  {
    path: 'camera',
    loadChildren: () => import('./Camera/app.routes').then(m => m.routes)
  },
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full'
  }
];