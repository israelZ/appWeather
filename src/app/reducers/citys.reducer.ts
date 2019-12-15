import { Action, createReducer, on } from '@ngrx/store';
import {addCity,removeCity} from '../actions/citys.actions';
import { InjectionToken } from '@angular/core';




export const citysFeatureKey = 'FavCities';

export interface State {
  cityId:any[]
}

export const initialState: State = {
  cityId:[]

};

const citysReducer = createReducer(
  initialState,
  on(addCity,(stete,action)=>({...stete, cityId: stete.cityId.concat(action.cityId)})),
  on(removeCity,(stete,action)=>({...stete, cityId: stete.cityId.filter(item=>action.cityId.id!=item.id)}))
);

export function reducer(state: State | undefined, action: Action) {
  return citysReducer(state, action);
}



export function CitiesReducer(state, action) {
  return citysReducer(state, action)
}

