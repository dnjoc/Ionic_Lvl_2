import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabs, IonIcon, IonTabButton, IonButtons, IonButton, IonImg } from '@ionic/angular/standalone';
import { documentTextOutline, personCircleOutline, home } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonImg, IonButton, IonButtons, IonTabButton, IonIcon, IonTabs, IonTabBar, IonHeader, IonToolbar, IonTitle, IonContent, RouterLink],
})
export class HomePage {
  constructor() {
    addIcons({
      documentTextOutline,
      personCircleOutline,
      home
    })
  }
}
