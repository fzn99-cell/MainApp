import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then((m) => m.WeatherPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];