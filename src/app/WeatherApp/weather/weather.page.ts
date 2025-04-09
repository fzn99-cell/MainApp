import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule]
})
export class WeatherPage implements OnInit {
  apiKey = 'fc9026285c84b89165d175f606586a31'; 
  country: string = '';
  city: string = 'London'; 
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
    const loading = await this.loadingController.create({
      message: 'Fetching weather data...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`;
    
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.weatherData = data;
        this.temp = `${Math.round(data.main.temp)}°C`;
        this.pres = `${data.main.pressure} hPa`;
        this.humidity = `${data.main.humidity}%`;
        
        this.weatherDescription = data.weather[0].description;
        
        this.flagUrl = `https://flagcdn.com/w80/${data.sys.country.toLowerCase()}.png`;
        this.weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        loading.dismiss();
      },
      error: (error) => {
        loading.dismiss();
        this.presentErrorAlert();
      }
    });
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