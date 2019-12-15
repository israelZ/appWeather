import { Action, createReducer, on } from '@ngrx/store';
import {loadDarks} from '../actions/dark.actions'
import { InjectionToken } from '@angular/core';

export const darkFeatureKey = 'dark';

export interface State {
isDark:boolean
}

export const initialState: State = {
 isDark:true
};

const darkReducer = createReducer(
  initialState,
  on(loadDarks,(state,action)=>({...state, isDark: action.isDark}))
);

export function reducer(state: State | undefined, action: Action) {
  return darkReducer(state, action);
}

export function DarkReducer(state, action) {
  return darkReducer(state, action)
}


