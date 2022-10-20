import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
Mapboxgl.accessToken = 'pk.eyJ1IjoianVkaXRzYXR1IiwiYSI6ImNsN2VuNTF3OTAyMGYzbmxxMzZlaTd4Y3YifQ.RhukOPcTrVMr2JtoIlRdzA';

if (!navigator.geolocation) {
  alert("This browser doesn't support Geolocation");
  throw new Error("This browser doesn't support Geolocation");
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
