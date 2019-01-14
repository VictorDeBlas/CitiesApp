import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { City } from '../model/city.model';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnChanges {

  @Input() public city: City = new City();
  @Input() public activateDialog = false;
  @Input() public isCreation = false;
  @Output() public activeDialogOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public forceUpdateListEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hasCityInfo = false;
  public modify = false;

  constructor(protected apiService: ApiService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.city && !changes.city.firstChange ) {
      this.hasCityInfo = true;
    } else if ( changes.isCreation && !changes.isCreation.firstChange ) {
      this.modify = true;
    }
  }

  public closeDialog(): void {
    this.activateDialog = false;
    this.activeDialogOutput.emit(false);
  }

  public deleteCity(): void {
    this.apiService.removeCity(this.city.id)
      .subscribe( response => {
        this.activateDialog = false;
        this.activeDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

  public modifyCity(): void {
    this.modify = !this.modify;
  }

  public updateCity(): void {
    this.apiService.updateCity(this.city)
      .subscribe( response => {
        this.activateDialog = false;
        this.activeDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

  public createCity(): void {
    this.apiService.createCity(this.city)
      .subscribe( response => {
        this.activateDialog = false;
        this.activeDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

}
