import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { FotoConfiguracion } from '../interface/foto-configuracion';
import { Platform } from "@ionic/angular";
import { Capacitor } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public photos: FotoConfiguracion[] = [];
  private PHOTO_STORAGE: string = 'fotos';
  private platform: Platform
  constructor(platform: Platform) {
    this.platform = platform
  }

  public async agregarFoto() {
    // Tomar Foto
    const foto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    const guardarImagen = await this.guardarFoto(foto)

    this.photos.unshift(guardarImagen);

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    })

  }

  private async guardarFoto(foto: Photo) {
    const base64Data = await this.readAsBase64(foto);

    const fileName = new Date().getTime() + 'jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })

    if (this.platform.is('hybrid')) {
      return{
        filePath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri)
      }
    } else {
      return {
        filePath: fileName,
        webviewPath: foto.webPath
      }
    }

  }

  private async readAsBase64(foto: Photo) {
    if (this.platform.is('hybrid') && foto.path !== undefined) {
      const file = await Filesystem.readFile({
        path: foto.path
      });

      return file.data
    } else {
      const response = await fetch(foto.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }

  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  public async cargarFoto(){
    const { value } = await Preferences.get({key: this.PHOTO_STORAGE});
    this.photos = (value ? JSON.parse(value) : []) as FotoConfiguracion[];

    if (!this.platform.is('hybrid')) {
      for (const foto of this.photos) {
        const readFile = await Filesystem.readFile({
          path: foto.filePath,
          directory: Directory.Data
        })

        foto.webviewPath = `data:image/jpeg;base64,${readFile.data}`
      }
    }

  }
}
