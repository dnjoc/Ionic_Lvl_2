import { Photo } from '@capacitor/camera';
import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButtons, IonButton } from '@ionic/angular/standalone';
import { flashlightOutline, home, camera } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { FotoService } from '../services/foto.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, IonImg, IonCol, IonRow, IonGrid, IonIcon, IonFabButton, IonFab, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, NgFor]
})
export class CameraPage {

  constructor(public servicioFoto: FotoService) {
    addIcons({
      flashlightOutline,
      home,
      camera
    });
    this.servicioFoto.cargarFoto();
   }

   tomarFoto() {
    this.servicioFoto.agregarFoto();
   }

}
