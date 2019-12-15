import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { FormsModule }   from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

// ngrx
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducers, metaReducers,REDUCER_TOKEN } from './reducers';
// import { SwitchReducer} from './reducers/switch-fc.reducer'
// import { SearchReducer} from './reducers/serch.reducer'
// import {DarkReducer } from './reducers/dark.reducer'
// import {CitiesReducer } from './reducers/citys.reducer'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityWeatherComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(REDUCER_TOKEN, {
      metaReducers,
      runtimeChecks: {strictStateImmutability: true,strictActionImmutability: true}}),
    HttpClientModule,
    FormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    
  ],
  providers: [
    CookieService,
    {
      provide: REDUCER_TOKEN,
      useValue: reducers
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
