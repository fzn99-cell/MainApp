import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs'; 

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    HttpClientModule
  ]
})
export class WeatherPage implements OnInit {
  apiKey = 'fc9026285c84b89165d175f606586a31'; 
  cityInput: string = 'London'; 
  temp: string = '';
  pres: string = '';
  humidity: string = '';
  weatherData: any = null;
  flagUrl: string = '';
  weatherIcon: string = '';
  weatherDescription: string = '';
  
  constructor(
    private http: HttpClient,
    private alertController: AlertController, 
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getWeatherData();
  }

  async getWeatherData() {
    if (!this.cityInput.trim()) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityInput}&appid=${this.apiKey}&units=metric`;

    try {
      this.weatherData = await firstValueFrom(this.http.get(url));
    } catch (error) {
      const alert = await this.alertController.create({ 
        header: 'Error',
        message: 'City not found. Try: Paris, Tokyo, New York',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  async showTempDetails() {
    const alert = await this.alertController.create({
      header: 'Temperature Details',
      cssClass: 'custom-alert',
      message: `
        <div class="alert-content">
          <div class="temp-detail">
            <ion-icon name="arrow-down-outline"></ion-icon>
            Min: ${Math.round(this.weatherData.main.temp_min)}°C
          </div>
          <div class="temp-detail">
            <ion-icon name="arrow-up-outline"></ion-icon>
            Max: ${Math.round(this.weatherData.main.temp_max)}°C
          </div>
          <div class="temp-detail">
            <ion-icon name="body-outline"></ion-icon>
            Feels like: ${Math.round(this.weatherData.main.feels_like)}°C
          </div>
        </div>
      `,
      buttons: ['Close']
    });
    await alert.present();
  }
  
  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'City Not Found',
      message: 'Could not fetch weather data. Please check city name and try again.',
      buttons: ['OK'],
      cssClass: 'error-alert'
    });
    await alert.present();
  }
}