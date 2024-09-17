import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonInput, IonIcon, IonTabButton, IonTabBar, IonTabs, IonButton, IonButtons, IonImg } from '@ionic/angular/standalone';
import { documentTextOutline, personCircleOutline, homeOutline } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonImg, IonButtons, IonButton, IonTabs, IonTabBar, IonTabButton, IonIcon, IonInput, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class RegistroPage {

  constructor() {
    addIcons({
      documentTextOutline,
      personCircleOutline,
      homeOutline
    })
   }


}
