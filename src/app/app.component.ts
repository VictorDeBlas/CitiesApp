import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/api.service';
import { City } from './model/city.model';
import { Marker } from './model/marker';
import { DialogService } from 'ng2-bootstrap-modal';
import { CityDetialComponent, CityDetailDialogParameters } from './city-detail/city-detial.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'app';

  // google maps zoom level
  public zoom: number = 4;
  
  // initial center position for the map
  public lat: number = 40.416775
  public lng: number = -3.703790;

  public cityList: Array<City> = [];
  public markers: Array<Marker> = [];

  constructor(protected apiService: ApiService, private dialogService: DialogService) {}

  public ngOnInit() {
    this.getCities();
  }

  public addCity(): void {
    console.log('add city');
    let params: CityDetailDialogParameters;
    this.dialogService.addDialog(CityDetialComponent, params);
  }

  public openCityInfo(selectedMarker: Marker): void {
    this.apiService.showCity(selectedMarker.id)
      .subscribe( city => this.openCityDialog(city));
  }

  private openCityDialog(city: City): void {
    this.dialogService.addDialog(CityDetialComponent, { city: city});
  }

  private getCities(): void {
    this.apiService.getList()
      .subscribe( cityList => {
        this.cityList = cityList;
        this.updateMarkers();
      });
  }

  private updateMarkers(): void {
    this.cityList.forEach( city => {
      const marker: Marker = new Marker();
      marker.id = city.id;
      marker.lat = parseInt(city.lat, 10);
      marker.lng = parseInt(city.long, 10);
      this.markers.push(marker);
    });
  }

}
