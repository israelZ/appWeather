import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {addCity,removeCity} from '../actions/citys.actions'
import { State } from '../reducers'

import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import {Store,select} from '@ngrx/store'



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient,private cookieService:CookieService,private store$ : Store<State>) {

    if(this.cookieService.check('citiesFav'))
    {
     var list=[];
     list= list.concat(JSON.parse(this.cookieService.get('citiesFav')))
     this.store$.dispatch(addCity({cityId :list} ))  
    }

   }

  key='CiBQ5TCQx4VaK3AHtSFKNjtSjsNRRbwT'

  searchCityByName(name)
  {
    
    return this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey='+this.key+'&q='+name+'&language=en-us')
   
  }


  get5Day(id):Observable<any>
  {
    return this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/'+id+'?apikey='+this.key+'&language=en-us')
    // .pipe(map((res:any)=>{return res.DailyForecasts}));
  }

  getWetNow(id)
  {
    
    return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/'+id+'?apikey='+this.key+'&language=en')
    .pipe(map((res:any)=>{return res[0]}));
  }



  

  

}
