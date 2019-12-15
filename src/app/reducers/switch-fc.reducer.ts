import { Action, createReducer, on } from '@ngrx/store';
import {addState} from '../actions/switch-fc.actions';
import { InjectionToken } from '@angular/core';

export const switchFCFeatureKey = 'ForC';

export interface State {
  switchFC:boolean
}

export const initialState: State = {
  switchFC:true
};

const switchFCReducer = createReducer(
  initialState,
  on(addState,(state,action)=>({...state, switchFC: action.switchFC}))

);

export function reducer(state: State | undefined, action: Action) {
  return switchFCReducer(state, action);
}

export function SwitchReducer(state, action) {
  return switchFCReducer(state, action)
}


