import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  private static API_URL = 'https://wf-challenge-jrpygindrv.herokuapp.com/api/v1/posts';

  constructor(private http: Http) { }

  public getList(): Observable<Array<City>> {
    return this.http.get(ApiService.API_URL)
      .map( response => {
        const jsonBodyResponse = response.json();
        return this.convertDataToCities(jsonBodyResponse);
      });
  }

  public showCity(cityId: number): Observable<City> {
    const showCityUrl = ApiService.API_URL + '/' + cityId;
    return this.http.get(showCityUrl)
      .map( response => {
          const jsonBodyResponse = response.json();
          return this.convertDataToCities([jsonBodyResponse])[0];
      });
  }

  public createCity(newCity: City): void {
    this.http.post(ApiService.API_URL, JSON.stringify(newCity))
    .subscribe( response => console.log(response));
  }

  public updateCity(city: City): void {
    const updateCityUrl = ApiService.API_URL + '/' + city.id;
    this.http.put(updateCityUrl, JSON.stringify(city))
    .subscribe(response => console.log(response));
  }

  public removeCity(cityId: number): void {
    const removeCityUrl = ApiService.API_URL + '/' + cityId;
    this.http.delete(removeCityUrl)
    .subscribe(response => console.log(response));
  }

  private convertDataToCities(jsonCities: Array<Object>): Array<City> {
    const citiesArray: Array<City> = [];
    jsonCities.forEach(jsonCity => citiesArray.push(new City(jsonCity)));
    return citiesArray;
  }

}
