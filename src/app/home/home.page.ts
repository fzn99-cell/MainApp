import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonIcon, IonCard, IonCardContent, 
  IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonButtons, IonMenuButton  
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  calculatorOutline, cameraOutline, 
  cloudOutline, menuOutline, homeOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  template: `
    <ion-header>
      <ion-toolbar color="purple">
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>My App Suite</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="custom-bg">
      <h1 class="custom-heading">Welcome to My App Suite</h1>
      <p class="custom-text">Your all-in-one solution for productivity and utility apps</p>
      
      <ion-card>
        <ion-card-header>
          <ion-card-title>Select an app to launch</ion-card-title>
        </ion-card-header>
        
        <ion-card-content>
          <ion-list>
            <ion-item button (click)="navigateTo('calculator')">
              <ion-icon slot="start" name="calculator-outline" color="purple"></ion-icon>
              <ion-label>Calculator</ion-label>
            </ion-item>
            
            <ion-item button (click)="navigateTo('camera')">
              <ion-icon slot="start" name="camera-outline" color="purple"></ion-icon>
              <ion-label>Camera</ion-label>
            </ion-item>
            
            <ion-item button (click)="navigateTo('weather')">
              <ion-icon slot="start" name="cloudy-night-outline" color="purple"></ion-icon>
              <ion-label>Weather App</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonIcon, IonCard, 
    IonCardContent, IonCardHeader, IonCardTitle,
    IonButtons, IonMenuButton
  ]
})
export class MainMenuPage {
  constructor(private router: Router) {
    addIcons({
      calculatorOutline, 
      cameraOutline, 
      cloudOutline,
      menuOutline,
      homeOutline
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}