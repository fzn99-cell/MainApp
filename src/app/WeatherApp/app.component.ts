import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // <-- Add this import

import { AppComponent } from './app.component';
import { WeatherPage } from './weather/weather.page';
import { HomePage } from './home/home.page';

@NgModule({
  declarations: [
    AppComponent,     // Main App component
    WeatherPage,      // Weather page component
    HomePage          // Home page component
  ],
  imports: [
    BrowserModule,    // Essential for Angular in the browser
    IonicModule.forRoot(),   // Initialize Ionic components
    HttpClientModule, 
    FormsModule       
  bootstrap: [AppComponent] 
export class AppModule {}

