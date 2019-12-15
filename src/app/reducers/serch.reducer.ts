import { Action, createReducer, on } from '@ngrx/store';
import {cityToFound} from '../actions/serch.actions'
import { InjectionToken } from '@angular/core';

export const serchFeatureKey = 'serch';

export interface State {
  result:any
}

export const initialState: State = {
  result:{}
};

const serchReducer = createReducer(
  initialState,
  on(cityToFound,(stete,action)=>({...stete, result: action.result}))

);

export function reducer(state: State | undefined, action: Action) {
  return serchReducer(state, action);
}

export function SearchReducer(state, action) {
  return serchReducer(state, action)
}

