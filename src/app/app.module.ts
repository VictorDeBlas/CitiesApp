import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { CityDetialComponent } from './city-detail/city-detial.component';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';


@NgModule({
  declarations: [
    AppComponent,
    CityDetialComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BootstrapModalModule.forRoot({container:document.body}),
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBtk6h6HmY_snnRQeDaOicZVsXp0a0H1XY'
    })
  ],
  entryComponents: [
    CityDetialComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
