import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonButton,
  IonList,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  searchOutline, 
  cloudyNightOutline, 
  thermometerOutline, 
  waterOutline, 
  speedometerOutline,
  arrowForwardOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.page.html',
  styleUrls: ['weather.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonIcon,
    IonButton,
    IonList,
    IonButtons,
    IonMenuButton,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ]
})
export class WeatherPage {
  cityName: string = '';
  weatherData: any = null;
  forecastData: any[] = [];
  showError: boolean = false;

  constructor() {
    addIcons({
      searchOutline,
      cloudyNightOutline,
      thermometerOutline,
      waterOutline,
      speedometerOutline,
      arrowForwardOutline
    });
  }

  searchWeather() {
    if (!this.cityName.trim()) return;

    this.showError = false;
    const apiKey = '2abe99b33cbc276396f9b4204ff14625';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        if (data.cod !== 200) {
          this.showError = true;
          this.weatherData = null;
          this.forecastData = [];
          return;
        }

        this.weatherData = {
          city: data.name,
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          countryCode: data.sys.country
        };

        this.getForecast(data.coord.lat, data.coord.lon, apiKey);
      })
      .catch(() => {
        this.showError = true;
        this.weatherData = null;
      });
  }

  getForecast(lat: number, lon: number, apiKey: string) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const forecastMap = new Map();

        data.list.forEach((entry: any) => {
          const date = new Date(entry.dt_txt).toLocaleDateString('en-US', { weekday: 'short' });
          if (!forecastMap.has(date)) {
            forecastMap.set(date, {
              date,
              condition: entry.weather[0].main,
              high: Math.round(entry.main.temp_max),
              low: Math.round(entry.main.temp_min),
            });
          }
        });

        this.forecastData = Array.from(forecastMap.values()).slice(1, 6); // Skip today
      });
  }
}
