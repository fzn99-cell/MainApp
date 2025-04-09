import { Component } from '@angular/core';
import { IonApp, IonMenu, IonRouterOutlet, IonContent, IonList, IonItem, IonIcon, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <ion-menu contentId="main-content">
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>App Suite</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-list>
            <ion-item button routerLink="/calculator">
              <ion-icon name="calculator" slot="start"></ion-icon>
              <ion-label>Calculator</ion-label>
            </ion-item>
            <ion-item button routerLink="/camera">
              <ion-icon name="camera" slot="start"></ion-icon>
              <ion-label>Camera</ion-label>
            </ion-item>
            <ion-item button routerLink="/weather">
              <ion-icon name="cloudy-night" slot="start"></ion-icon>
              <ion-label>Weather</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
  `,
  standalone: true,
  imports: [
    IonApp, IonMenu, IonRouterOutlet, IonContent,
    IonList, IonItem, IonIcon, IonLabel,
    IonHeader, IonTitle, IonToolbar, RouterModule
  ]
})
export class AppComponent {}