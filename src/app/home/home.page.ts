import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItem, IonLabel, IonIcon, IonCard, IonCardContent, 
  IonCardHeader, IonCardTitle, IonCardSubtitle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  calculatorOutline, cameraOutline, 
  cloudOutline, menuOutline, homeOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-main-menu',
  template: `
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>My App Suite</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Welcome to My App Suite</ion-card-title>
          <ion-card-subtitle>Select an app to launch</ion-card-subtitle>
        </ion-card-header>
        
        <ion-card-content>
          <ion-list>
            <ion-item button (click)="navigateTo('calculator')">
              <ion-icon slot="start" name="calculator-outline" color="primary"></ion-icon>
              <ion-label>Calculator</ion-label>
            </ion-item>
            
            <ion-item button (click)="navigateTo('camera')">
              <ion-icon slot="start" name="camera-outline" color="primary"></ion-icon>
              <ion-label>Camera</ion-label>
            </ion-item>
            
            <ion-item button (click)="navigateTo('weather/home')">
              <ion-icon slot="start" name="cloud-outline" color="primary"></ion-icon>
              <ion-label>Weather App</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonList, IonItem, IonLabel, IonIcon, IonCard, 
    IonCardContent, IonCardHeader, IonCardTitle, IonCardSubtitle
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