import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'linterna',
    loadComponent: () => import('./linterna/linterna.page').then( m => m.LinternaPage)
  },
  {
    path: 'camera',
    loadComponent: () => import('./camera/camera.page').then( m => m.CameraPage)
  },
  {
    path: 'delivery',
    loadComponent: () => import('./delivery/delivery.page').then( m => m.DeliveryPage)
  },
];
