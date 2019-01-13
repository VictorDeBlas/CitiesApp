import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { City } from '../model/city.model';

export interface CityDetailDialogParameters {
  city?: City;
}

@Component({
  selector: 'app-city-detial',
  templateUrl: './city-detial.component.html',
  styleUrls: ['./city-detial.component.scss']
})
export class CityDetialComponent extends DialogComponent<CityDetailDialogParameters, boolean> implements OnInit, CityDetailDialogParameters {

  public city: City;

  constructor(dialogService: DialogService) {
    super(dialogService);
    console.log(this.city);
  }

  ngOnInit() {
  }

}
