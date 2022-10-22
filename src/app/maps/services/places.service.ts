import { Injectable } from '@angular/core';
import { PlacesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( 
    private placesApi: PlacesApiClient,
    private mapService: MapService
  ) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise( (resolve, reject ) => {

      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [ coords.longitude, coords.latitude ]
          resolve( this.userLocation )
        },
        ( err ) => {
          alert('Cannot get Geolocation')
          console.log(err);
          reject();
        }
      );

    }); 
  }

  getPlacesByQuery( query: string = '' ) {
    //evaluar quan el query es null
    if (query.length === 0) {
      this.isLoadingPlaces = false;
      this.places = [];
      return
    }

    if (!this.userLocation) throw Error('There is not user location')

    this.isLoadingPlaces = true;

    this.placesApi.get<PlacesResponse>(`/${ query }.json`, {
      params: {
        proximity: this.userLocation?.join(',')
      }
    })
      .subscribe( res => {
        this.isLoadingPlaces = false;
        this.places = res.features;

        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!)
      });
  }


  deletePlaces() {
    this.places = [];
  }

}