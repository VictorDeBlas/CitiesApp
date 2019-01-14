import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { City } from './model/city.model';
import { Marker } from './model/marker';
import { CityDetailComponent } from './city-detail/city-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {

  // google maps zoom level
  public zoom: number = 4;
  // initial center position for the map
  public lat: number = 40.416775
  public lng: number = -3.703790;

  public selectedCity: City;
  public cityList: Array<City> = [];
  public markers: Array<Marker> = [];
  public showDialog = false;
  public isCreation = false;

  constructor(protected apiService: ApiService) {}

  public ngOnInit() {
    this.getCities();
  }

  public addCity(): void {
    this.selectedCity = new City();
    this.isCreation = true;
    this.showDialog = true;
  }

  public openCityInfo(selectedMarker: Marker): void {
    this.isCreation = false;
    this.apiService.showCity(selectedMarker.id)
      .subscribe( city => this.openCityDialog(city));
  }

  private openCityDialog(city: City): void {
    this.selectedCity = city;
    this.showDialog = true;
  }

  public getCities(): void {
    this.apiService.getList()
      .subscribe( cityList => {
        this.cityList = cityList;
        this.updateMarkers();
      });
  }

  private updateMarkers(): void {
    this.markers = [];
    this.cityList.forEach( city => {
      const marker: Marker = new Marker();
      marker.id = city.id;
      marker.lat = parseInt(city.lat, 10);
      marker.lng = parseInt(city.long, 10);
      this.markers.push(marker);
    });
  }

}
