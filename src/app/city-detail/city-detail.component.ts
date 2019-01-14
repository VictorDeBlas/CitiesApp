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
  @Output() public activateDialogOutput: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() public forceUpdateListEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  public hasCityInfo = false;
  public modify = false;

  public titleError = false;
  public contentError = false;

  constructor(protected apiService: ApiService) {
    this.modify = this.isCreation;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ( changes.isCreation ) {
      this.modify = this.isCreation;
    }
  }

  public closeDialog(): void {
    this.activateDialog = false;
    this.activateDialogOutput.emit(false);
  }

  public deleteCity(): void {
    this.apiService.removeCity(this.city.id)
      .subscribe( response => {
        this.activateDialog = false;
        this.activateDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

  public modifyCity(): void {
    this.modify = !this.modify;
  }

  public updateCity(): void {
    if (this.checkFormError()) {
      return;
    }
    this.apiService.updateCity(this.city)
      .subscribe( response => {
        this.activateDialog = false;
        this.activateDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

  public createCity(): void {
    if (this.checkFormError()) {
      return;
    }
    this.apiService.createCity(this.city)
      .subscribe( response => {
        this.activateDialog = false;
        this.activateDialogOutput.emit(false);
        this.forceUpdateListEmitter.emit(true);
      });
  }

  private checkFormError(): boolean {
    this.titleError = (!this.city.title) ? true : false;
    this.contentError = (!this.city.content) ? true : false;
    return this.titleError && this.contentError;
  }

}
