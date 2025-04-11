import { Component } from '@angular/core';
import { 
  IonApp, IonMenu, IonRouterOutlet, IonContent, IonList, IonItem, 
  IonIcon, IonLabel, IonHeader, IonTitle, IonToolbar, IonSplitPane,
  IonFooter, IonMenuToggle, IonButtons, IonMenuButton 
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { 
  calculatorOutline, 
  cloudyNightOutline, 
  cameraOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonApp, IonMenu, IonRouterOutlet, IonContent,
    IonList, IonItem, IonIcon, IonLabel,
    IonHeader, IonTitle, IonToolbar,
    IonSplitPane, IonFooter, IonMenuToggle, IonButtons,
    IonMenuButton
  ]
})
export class AppComponent {
  public appPages = [
    { title: 'Calculator', url: '/calculator', icon: 'calculator-outline' },
    { title: 'Weather', url: '/weather', icon: 'cloudy-night-outline' },
    { title: 'Camera', url: '/camera', icon: 'camera-outline' }
  ];
  
  constructor() {
    // Register the icons we need
    addIcons({
      calculatorOutline, 
      cloudyNightOutline, 
      cameraOutline
    });
  }
}