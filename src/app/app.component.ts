import { Component } from '@angular/core';


import {Store,select} from '@ngrx/store'
import { State } from './reducers'
import {loadDarks} from './actions/dark.actions'
import { Observable, of} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  darkSwitch$ : Observable<boolean> =this.store$.pipe(select('dark','isDark'))

  constructor( private store$:Store<State>) { }

  ngOnInit() {}
  
}
