import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private photoSubject = new BehaviorSubject<string[]>([]);
  private photoArray: string[] = [];

  constructor() {
    this.loadSavedPhotos();
  }

  getPhotos(): Observable<string[]> {
    return this.photoSubject.asObservable();
  }

  clearPhotos(): void {
    this.photoArray = [];
    this.photoSubject.next(this.photoArray);
    localStorage.setItem('purpleCameraPhotos', JSON.stringify(this.photoArray));
  }

  async takePicture(): Promise<string | null> {
    try {
      if (!Capacitor.isPluginAvailable('Camera')) {
        console.error('Camera plugin not available');
        return null;
      }

      const isPlatformWeb = Capacitor.getPlatform() === 'web';
      
      const options = {
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: !isPlatformWeb, // Only save to gallery on native
        webUseInput: isPlatformWeb // Use file input on web
      };

      const image = await Camera.getPhoto(options);
      
      if (image && image.webPath) {
        this.photoArray.unshift(image.webPath);
        this.photoSubject.next([...this.photoArray]);
        localStorage.setItem('purpleCameraPhotos', JSON.stringify(this.photoArray));
        return image.webPath;
      }
      return null;
    } catch (error) {
      console.error('Camera error:', error);
      return null;
    }
  }
  
  private loadSavedPhotos(): void {
    try {
      const photoData = localStorage.getItem('purpleCameraPhotos');
      if (photoData) {
        this.photoArray = JSON.parse(photoData);
        this.photoSubject.next([...this.photoArray]);
      }
    } catch (error) {
      console.error('Error loading saved photos', error);
    }
  }
}