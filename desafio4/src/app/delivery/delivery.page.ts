import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonButtons } from '@ionic/angular/standalone';
import { flashlightOutline, home, cameraOutline, location, pin } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.page.html',
  styleUrls: ['./delivery.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgIf, RouterLink]
})
export class DeliveryPage {
  @ViewChild('mapa')
  mapRef!: ElementRef<HTMLElement>;
  newMap!: GoogleMap;

  latitud: number = 0;
  longitud: number = 0;

  mostrar: boolean = true;
  mostrar2: boolean = false;

  // lugar: string = "";

  constructor(private alertController: AlertController) {
    addIcons({
      flashlightOutline,
      home,
      cameraOutline,
      location,
      pin
    });
   }

    async obtenerUbicacion(){
      await Geolocation.getCurrentPosition().then((data) => {
        this.latitud = data.coords.latitude;
        this.longitud = data.coords.longitude;
        console.log(data);
        this.mostrar = false;
        this.mostrar2 = true;
      })
      this.crearMapa();
    }

    async crearMapa() {
      this.newMap = await GoogleMap.create({
        id: 'mi-map',
        element: this.mapRef.nativeElement,
        apiKey: environment.apiKey,
        config: {
          center: {
            lat: this.latitud,
            lng: this.longitud,
          },
          zoom: 17,
        },
      });
      this.agregarMarcador();
    }


  async agregarMarcador(){
    const marcador: Marker = {
      coordinate: {
        lat: this.latitud,
        lng: this.longitud,
      },
      draggable: true
    }
    await this.newMap.addMarker(marcador);

    this.newMap.setOnMarkerClickListener( (marcador) => {
      this.confirmAlert(marcador);
    })
  }


  async confirmAlert(marc: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que esta es tu ubicación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Si',
          role: 'confirm',
          handler: () => {
              // this.lugar = `https://www.google.es/maps?q=${marc.latitude},${marc.longitude}`;
              // console.log(marc);
              console.log('Confirmado');
              this.mostrar2 = false
              console.log(`Su direccion es: Latitud: ${marc.latitude}, Longitud: ${marc.longitude}`);
              this.alertUbicacion(marc);
        }
        }
      ]
    });
    await alert.present();
  }


  async alertUbicacion(marc: any) {
    const alert = await this.alertController.create({
      header: 'Su direccion es:',
      message: `Latitud: ${marc.latitude}, Longitud: ${marc.longitude}`,
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
        }
      ]
    });
    await alert.present();
  }
}
