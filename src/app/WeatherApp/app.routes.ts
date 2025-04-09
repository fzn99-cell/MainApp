import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./weather/weather.page').then(m => m.WeatherPage)
  }
];