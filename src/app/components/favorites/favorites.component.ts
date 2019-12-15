import { Component, OnInit } from '@angular/core';
import{ServiceService} from '../../services/service.service'
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChangeDetectorRef } from '@angular/core';

// ngrx/reduce
import { Observable } from 'rxjs';
import {Store, select} from '@ngrx/store';
import {State} from '../../reducers'
import { map } from 'rxjs/operators';
import { isEmpty } from 'rxjs/operators';

import {cityToFound} from '../../actions/serch.actions'
import {removeCity} from '../../actions/citys.actions'


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  cityIdsFavorute$ : Observable<String[]> =this.store$.pipe( select('FavCities','cityId') )
  f_c_switch$ : Observable<boolean> =this.store$.pipe(select('ForC','switchFC'))
  darkSwitch$ : Observable<boolean> =this.store$.pipe(select('dark','isDark'))
  
  cityFavorute$ : Observable<any>
  citys:any[]=[]
  // flag:boolean
  



  constructor(private cdRef:ChangeDetectorRef,public service:ServiceService , private store$ : Store<State> ,private router:Router , 
    private  cityToNaviget$:Store<State>,private cookieService:CookieService) { 


      this.cityFavorute$=this.cityIdsFavorute$.pipe(map((listFav:any)=>
      {
        var listFavFromVue=[]
        listFav.forEach(cityFav=>{

          this.service.get5Day(cityFav['id']).subscribe(r=>
            {
              var cityFavForGet={id:cityFav['id'],name:cityFav['nam'],days:r['DailyForecasts']}
              listFavFromVue.push(cityFavForGet)
            })

          })

          return listFavFromVue

      }))
    }
    
    
    
    ngOnInit() {}
   
  // get parse deta
  parserDeta(dateDay){
    return dateDay.substr(8,2)+'/'+dateDay.substr(5,2)+'/'+dateDay.substr(0,4)
  }

  navCityWth(nameCity)
  {
    this.service.searchCityByName(nameCity).subscribe(res=>{
      
      this.cityToNaviget$.dispatch(cityToFound({result : res[0]}))
    
      this.router.navigate(['home/city-weather'])
    
    })

  }

  removeFavorit(id,name){

    console.log(id,name)

    var removeCityFav={id:id,nam:name}

    this.store$.dispatch(removeCity({cityId : removeCityFav}))

    this.removeCityCookie(id)
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


}
