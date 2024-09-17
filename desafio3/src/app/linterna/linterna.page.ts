import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { flashlightOutline, home } from "ionicons/icons";
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-linterna',
  templateUrl: './linterna.page.html',
  styleUrls: ['./linterna.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink],
  providers: [Flashlight]
})
export class LinternaPage {

  isOn = false;

  constructor(public flashlight: Flashlight) {
    addIcons({
      flashlightOutline,
      home
    })
  }
  toggleFlashlight() {
    this.isOn =!this.isOn;
    this.flashlight.toggle();
  }

}
