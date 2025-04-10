import { Routes } from '@angular/router';
import { WeatherPage } from './weather/weather.page';
import { HomePage } from './home/home.page';

export const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'weather', component: WeatherPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];