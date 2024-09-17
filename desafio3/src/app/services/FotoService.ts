import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FotoConfiguracion } from '../interface/foto-configuracion';


@Injectable({
  providedIn: 'root'
})
export class FotoService {
  public photos: FotoConfiguracion[] = [];
  constructor() { }

  public async agregarFoto() {
    // Take a photo
    const tomarFoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "proximamente...",
      webviewPath: tomarFoto.webPath
    });

    const guardarImagen = await this.guardarFoto(tomarFoto);
  }


  private async guardarFoto(foto: Photo) {
    const base64Data = await this.readAsBase64(foto);
    const fileName = new Date().getTime() + 'jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    return {
      filePath: fileName,
      webViewPath: foto.webPath,
    };
  }

  private async readAsBase64(foto: Photo) {
    const response = await fetch(foto.webPath);
    const blob = await response.blob();

    return await this.converBlobToBase64(blob) as unknown as string;
  }

  private converBlobToBase64 = (blob: Blob) => {
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
  };
}
