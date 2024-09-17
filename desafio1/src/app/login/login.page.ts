import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonItem, IonList, IonIcon, IonTabBar, IonTabs, IonTabButton, IonButton, IonButtons, IonImg, IonAvatar } from '@ionic/angular/standalone';
import { documentTextOutline, personCircleOutline, homeOutline } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonAvatar, IonImg, IonButtons, IonButton, IonTabButton, IonTabs, IonTabBar, IonIcon, IonList, IonItem, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class LoginPage {

  constructor() {
    addIcons({
      documentTextOutline,
      personCircleOutline,
      homeOutline
    })
   }


}
