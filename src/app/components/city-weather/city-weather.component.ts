import { Component, OnInit } from '@angular/core';
import {ServiceService} from './../../services/service.service'
import { CookieService } from 'ngx-cookie-service';

// ngrx
import {Store,select} from '@ngrx/store'
import { State } from '../../reducers'
import {addCity,removeCity} from '../../actions/citys.actions'
import { Observable, of} from 'rxjs';




 



@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {


  // reducer
  WeatherOfCity$ : Observable<{}> =this.store$.pipe(select('serch','result'))
  FavoritesList$ : Observable<{}> =this.store$.pipe(select('FavCities','cityId'))
  f_c_switch$ : Observable<boolean> =this.store$.pipe(select('ForC','switchFC'))
  darkSwitch$ : Observable<boolean> =this.store$.pipe(select('dark','isDark'))
  
   
   nameCity:String; 
   nameCountry:String;
   idCity:String;
   today
   the5day
  

  
  flagFavorites:Observable<Boolean>;
  flagCockis:boolean=true;
   

   forecastSummary:String
   favoritesList:any=[];


  constructor(public service:ServiceService,private store$ : Store<State>,private cookieService: CookieService ) 
  {

    this.WeatherOfCity$.subscribe(event=>{
      
      this.the5day=this.service.get5Day(event['Key'])
      this.today=this.service.getWetNow(event['Key'])
      
      this.nameCity=event['LocalizedName']
      this.nameCountry=event['Country']['LocalizedName']
      this.idCity=event['Key']

      this.initFlagFavorite(event['Key'])

    })


  }


      
  ngOnInit() {}



  parserDeta(dateDay){
    return dateDay.substr(8,2)+'/'+dateDay.substr(5,2)
  
  }

  parserTime(time){
    return time.substr(11,5)
  }

  addFavorites()
  { 
    var newCityFav={id:this.idCity,nam:this.nameCity}
    
    this.store$.dispatch(addCity({cityId :newCityFav} ))

    this.flagFavorites=of(true)    

    this.addCityCookie(newCityFav)
  }
      

  removeFavorites(){
    
    
    var removeCityFav={id:this.idCity,nam:this.nameCity}

    this.store$.dispatch(removeCity({cityId : removeCityFav}))
   
    this.flagFavorites=of(false)

    this.removeCityCookie(this.idCity)

  }

  initFlagFavorite(id)
  {

    this.FavoritesList$.subscribe(res=>
      {
        let cityInFavorites:any=res
        var flag:boolean=true


        cityInFavorites.forEach(city=>{
          
          if (city['id']==id) 
            flag=!flag
        })


        flag ? this.flagFavorites=of(false) : this.flagFavorites=of(true)

        })
     
  }

  parserCelsius(degrees){
    return  Math.floor(((degrees-32)*5)/9)
  }

  removeCityCookie(id)
  {
    if(this.cookieService.check('citiesFav'))
    {
     var cookieFavorites=[];

     cookieFavorites=JSON.parse(this.cookieService.get('citiesFav'))
     
     cookieFavorites= cookieFavorites.filter(item=>item.id!=id)
     
     this.cookieService.set('citiesFav', JSON.stringify(cookieFavorites));

    }
  }


  addCityCookie(newCityFav)
  {
    
    if(this.cookieService.check('citiesFav'))
    {
     var cookieFavorites=[];

     cookieFavorites= cookieFavorites.concat(JSON.parse(this.cookieService.get('citiesFav')))
     
     cookieFavorites.push(newCityFav)
     
     this.cookieService.set('citiesFav', JSON.stringify(cookieFavorites));
    }
    else
    {
     var cookieFavorites=[];
     
     cookieFavorites.push(newCityFav)
     
     this.cookieService.set('citiesFav', JSON.stringify(cookieFavorites));
    }

  }


}
