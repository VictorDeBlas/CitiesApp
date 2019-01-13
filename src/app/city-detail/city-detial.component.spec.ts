import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDetialComponent } from './city-detial.component';

describe('CityDetialComponent', () => {
  let component: CityDetialComponent;
  let fixture: ComponentFixture<CityDetialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityDetialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityDetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
