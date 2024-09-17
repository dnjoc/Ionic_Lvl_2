import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonToast, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { flashlightOutline, home } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonButtons, IonToast, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
  providers: [Flashlight]
})
export class HomePage implements OnInit {
  connectionStatus: ConnectionStatus;
  isToastOpen = false;
  msg: any;


  constructor(public flashlight: Flashlight, public toastController: ToastController) {
    this.connectionStatus = { connected: false, connectionType: 'unknown' };
    addIcons({
      flashlightOutline,
      home
    });
    this.statusRed();
    this.cambiosDeRed();
  }

  async ngOnInit() {
    const status = await Network.getStatus()

    this.presentToast(`Tipo de conexión: ${status.connectionType}, Estado: ${status.connected}`);

     this.linterna();

  }

  async ionViewWillEnter() {
    const status = await Network.getStatus()

    this.presentToast(`Tipo de conexión: ${status.connectionType}, Estado: ${status.connected}`);

    this.linterna();

}
async statusRed() {
  try {this.connectionStatus = await Network.getStatus();
    console.log('Estado de la conexión:', this.connectionStatus);
  } catch (error) {
    console.error('Error no se conoce la conexion:', error);
  }
};
cambiosDeRed() {
  Network.addListener('networkStatusChange', async (status) => {
    await this.delay(1000);
    this.connectionStatus = status;
    console.log(`Tipo de conexión: ${status.connectionType}, Estado: ${status.connected}`);
    this.presentToast(`Tipo de conexión: ${status.connectionType}, Estado: ${status.connected}`);
    this.linterna();
  });
}
  // async ionViewDidEnter() {
  //   Network.addListener('networkStatusChange', (ConnectionStatusChangeListener) => {
  //     this.presentToast(`Tipo de conexión: ${ConnectionStatusChangeListener.connectionType}, Estado: ${ConnectionStatusChangeListener.connected}`);
  //   this.linterna();
  // });

//    toast() {
//      Network.addListener('networkStatusChange', (ConnectionStatusChangeListener) => {
//     this.msg =`Tipo de conexión: ${ConnectionStatusChangeListener.connectionType}, Estado: ${ConnectionStatusChangeListener.connected}`;
//   });
// }

async presentToast(message: string) {
  const toast = await this.toastController.create({
   message: message,
    duration: 4000
  });

   await toast.present();
  }

   async linterna() {
    this.flashlight.switchOn();
    setTimeout(() => this.flashlight.switchOff(), 300);
    setTimeout(() => this.flashlight.switchOn(), 600);
    setTimeout(() => this.flashlight.switchOff(), 900);
    setTimeout(() => this.flashlight.switchOn(), 1200);
    setTimeout(() => this.flashlight.switchOff(), 1500);
  }

   async setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
