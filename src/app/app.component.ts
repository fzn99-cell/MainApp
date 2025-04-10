import { Component } from '@angular/core';
import { 
  IonApp, IonMenu, IonRouterOutlet, IonContent, IonList, IonItem, 
  IonIcon, IonLabel, IonHeader, IonTitle, IonToolbar, IonSplitPane,
  IonFooter, IonMenuToggle, IonButtons, IonMenuButton 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonApp, IonMenu, IonRouterOutlet, IonContent,
    IonList, IonItem, IonIcon, IonLabel,
    IonHeader, IonTitle, IonToolbar, RouterModule,
    IonSplitPane, IonFooter, IonMenuToggle, IonButtons,
    IonMenuButton
  ]
})
export class AppComponent {
  public appPages = [
    { title: 'Calculator', url: '/calculator', icon: 'calculator' },
    { title: 'Weather', url: '/weather', icon: 'cloudy-night' },
    { title: 'Camera', url: '/camera', icon: 'camera' }
  ];
  
  constructor() {}
}