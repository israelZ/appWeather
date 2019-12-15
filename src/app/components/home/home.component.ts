import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ServiceService} from '../../services/service.service'
import {NgForm} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import * as $ from 'jquery';
import 'bootstrap'; 
import 'popper.js'
// ngrx

import {Store,select} from '@ngrx/store'
import { State } from '../../reducers'
import {cityToFound} from '../../actions/serch.actions'
import {addState} from '../../actions/switch-fc.actions'
import {loadDarks} from '../../actions/dark.actions'
import { Observable, of} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  resCity:any=[]
  citySerch:String


  f_c_flag:boolean=false
  darkFlag:boolean=false

  darkSwitch$ : Observable<boolean> =this.store$.pipe(select('dark','isDark'))

  constructor(private router:Router, private store$:Store<State>, 
    private service:ServiceService, private cookieService: CookieService ) {
      // Default Search tel aviv
      this.searchCity() 
  }

  ngOnInit() {
      $('#switch_fc').change(()=>{this.switchFC()})
      $('#switchDark').change(()=>{this.switchDark()}) 

      this.darkSwitch$.subscribe(res=>{
        if(res)
        document.getElementById("body").style.cssText="background: url('./assets/blue-sky.jpg') no-repeat center center fixed;background-size: cover;"
        else
        document.getElementById("body").style.cssText="background-image: linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%),url('../../../assets/blue-sky.jpg');background-size: cover;"

      })
    
   }


  searchCity(name='tel aviv')
  {
    
    this.service.searchCityByName(name).subscribe(res=>
      {
       this.resCity=res;

      switch (Object.keys(this.resCity).length) 
      {
        case 0:
            $('#messegs').addClass('show')
            setTimeout(()=>{$('#messegs').removeClass('show') },5000)
          break;
        case 1:
            this.store$.dispatch(cityToFound({result : res[0]}))
            this.router.navigate(['home/city-weather']) 
            
            $('#listCirysModal').modal('hide') 
        break;
        default:
            let flag:boolean=true;

            this.resCity.forEach(city=>
              {
                if (city['LocalizedName'].toLowerCase()==name.toLowerCase())
                {
                  this.store$.dispatch(cityToFound({result : res[0]}))
                  this.router.navigate(['home/city-weather'])
                  $('#listCirysModal').modal('hide')
                  flag=false
                }
              })



             flag ? $('#listCirysModal').modal('show') : $('#listCirysModal').modal('hide')
        break;
      }
    })

  }


  naviToFavorute(){
    this.router.navigate(['home/favorites'])
  }

  naviByCity(){
    this.router.navigate(['home/city-weather'])
  }

  onSubmit(form: NgForm) { 
    form.valid ? this.searchCity(form.value['cityForm']) : $('input[name=cityForm]').attr('placeholder','require city name') 
  }

  switchFC()
  {
    this.f_c_flag=!this.f_c_flag
    this.store$.dispatch(addState({switchFC:!this.f_c_flag}))
  }

  switchDark()
  {
    this.darkFlag=!this.darkFlag
    this.store$.dispatch(loadDarks({isDark:!this.darkFlag}))
  }
}
