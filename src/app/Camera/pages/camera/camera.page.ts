import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonIcon, IonSpinner, IonItem, IonLabel, 
  IonGrid, IonRow, IonCol, ActionSheetController, ToastController
} from '@ionic/angular/standalone';
import { CameraService } from '../../services/camera.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { 
  camera, cameraOutline, trashOutline, closeOutline, 
  alertCircleOutline, imagesOutline, eyeOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
    IonButton, IonIcon, IonSpinner, IonItem, IonLabel, 
    IonGrid, IonRow, IonCol
  ]
})
export class CameraPage implements OnInit, OnDestroy {
  photos: string[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  private subscription = new Subscription();
  
  constructor(
    private cameraService: CameraService,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private zone: NgZone
  ) {
    addIcons({
      camera, cameraOutline, trashOutline, closeOutline, 
      alertCircleOutline, imagesOutline, eyeOutline
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cameraService.photos$.subscribe(photos => {
        this.zone.run(() => {
          this.photos = photos;
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async captureImage(): Promise<void> {
    this.zone.run(() => {
      this.isLoading = true;
      this.errorMessage = null;
    });
    
    try {
      const photo = await this.cameraService.takePicture();
      this.zone.run(async () => {
        if (!photo) {
          this.errorMessage = 'No image captured. Please try again.';
        } else {
          await this.showToast('Photo captured successfully!');
        }
        this.isLoading = false;
      });
    } catch (error) {
      this.zone.run(() => {
        this.errorMessage = 'Error capturing image. Please try again.';
        this.isLoading = false;
      });
    }
  }

  async clearAllPhotos(): Promise<void> {
    if (this.photos.length === 0) return;
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Clear all photos?',
      buttons: [
        {
          text: 'Delete All',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.cameraService.clearPhotos();
            this.showToast('All photos cleared');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close-outline'
        }
      ]
    });
    
    await actionSheet.present();
  }

  async viewPhoto(photoUrl: string): Promise<void> {
    const toast = await this.toastController.create({
      message: `Viewing photo: ${photoUrl}`,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  dismissError(): void {
    this.errorMessage = null;
  }

  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary'
    });
    await toast.present();
  }
}