import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private photosSubject = new BehaviorSubject<string[]>([]);
  
  get photos$(): Observable<string[]> {
    return this.photosSubject.asObservable();
  }

  async takePicture(): Promise<string> {
    const image = await Camera.getPhoto({
      quality: 90,
      source: CameraSource.Camera,
      resultType: CameraResultType.Uri
    });
    
    if (image.webPath) {
      const currentPhotos = this.photosSubject.value;
      this.photosSubject.next([...currentPhotos, image.webPath]);
      return image.webPath;
    }
    return '';
  }

  clearPhotos(): void {
    this.photosSubject.next([]);
  }
}