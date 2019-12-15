import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component'
import {CityWeatherComponent} from './components/city-weather/city-weather.component'
import {FavoritesComponent} from './components/favorites/favorites.component'

const routes: Routes = [
  
  {path: '',  redirectTo: 'home',pathMatch: 'full'},
  {path:'home',component:HomeComponent, children:[
    {path:'city-weather',component:CityWeatherComponent},
    {path:'favorites',component:FavoritesComponent}
  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
