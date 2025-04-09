import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
  IonButton, IonIcon, IonSpinner, IonItem, IonLabel, 
  IonGrid, IonRow, IonCol, ActionSheetController, ToastController 
} from '@ionic/angular/standalone';
import { Camera } from '@capacitor/camera';
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
    private toastController: ToastController
  ) {
    addIcons({
      camera, cameraOutline, trashOutline, closeOutline, 
      alertCircleOutline, imagesOutline, eyeOutline
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cameraService.getPhotos().subscribe(photos => {
        this.photos = photos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async captureImage(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = null;
    
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        this.errorMessage = 'Camera permission is required to take photos.';
        this.isLoading = false;
        return;
      }
      
      const photo = await this.cameraService.takePicture();
      if (!photo) {
        this.errorMessage = 'No image captured. Please try again.';
      } else {
        await this.showToast('Photo captured successfully!');
      }
    } catch (error) {
      this.errorMessage = 'Error capturing image. Please try again.';
      console.error('Camera error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async clearAllPhotos(): Promise<void> {
    if (this.photos.length === 0) return;
    
    const actionSheet = await this.actionSheetController.create({
      header: 'Clear all photos?',
      cssClass: 'purple-action-sheet',
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
    console.log('Viewing photo:', photoUrl);
    await this.showToast('Photo viewer will open here');
  }
  
  dismissError(): void {
    this.errorMessage = null;
  }
  
  private async showToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'primary',
      cssClass: 'purple-toast'
    });
    await toast.present();
  }

  async requestPermissions(): Promise<boolean> {
    try {
      const permissionState = await Camera.checkPermissions();
      
      if (permissionState.camera !== 'granted') {
        const requestResult = await Camera.requestPermissions();
        return requestResult.camera === 'granted';
      }
      
      return true;
    } catch (error) {
      console.error('Permission error:', error);
      this.errorMessage = 'Camera permission is required to take photos.';
      return false;
    }
  }
}