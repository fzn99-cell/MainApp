import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  searchOutline, thermometerOutline, 
  waterOutline, constructOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class WeatherPage {
  cityInput: string = ''; 
  weatherData: any = null; 
  errorMessage: string = ''; 
  apiKey: string = 'a260918bdfea99e0c8d754bc454977a6'; 

  constructor(private http: HttpClient, private alertController: AlertController) {
    // Add Ionic icons needed for this component
    addIcons({
      searchOutline,
      thermometerOutline,
      waterOutline,
      constructOutline
    });
  }

  async getWeatherData() {
    if (!this.cityInput.trim()) return; 
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&appid=${this.apiKey}&units=metric`;
      this.weatherData = await firstValueFrom(this.http.get(url));
      this.errorMessage = ''; 
    } catch (error) {
      this.weatherData = null;
      this.errorMessage = 'City not found. Try: Paris, Tokyo, New York';
      this.showErrorAlert();
    }
  }

  private async showErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: this.errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }
}