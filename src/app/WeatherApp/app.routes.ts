import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherPage } from './weather/weather.page';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: 'home', component: HomePage },
  { path: 'weather', component: WeatherPage },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

