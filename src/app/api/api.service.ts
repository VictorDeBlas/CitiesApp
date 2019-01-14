import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { Observable } from 'rxjs/Observable';
import { Http, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

class Options implements RequestOptionsArgs {
  public headers;
}

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

  public createCity(newCity: City): Observable<any> {
    const newOptions: Options = new Options;
    newOptions.headers = new Headers();
    newOptions.headers.append('Content-Type', 'application/json');
    return this.http.post(ApiService.API_URL, JSON.stringify(newCity), newOptions);
  }

  public updateCity(city: City): Observable<any> {
    const updateCityUrl = ApiService.API_URL + '/' + city.id;
    return this.http.put(updateCityUrl, JSON.stringify(city));
  }

  public removeCity(cityId: number): Observable<any> {
    const removeCityUrl = ApiService.API_URL + '/' + cityId;
    return this.http.delete(removeCityUrl);
  }

  private convertDataToCities(jsonCities: Array<Object>): Array<City> {
    const citiesArray: Array<City> = [];
    jsonCities.forEach(jsonCity => citiesArray.push(new City(jsonCity)));
    return citiesArray;
  }

}
