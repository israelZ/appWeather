import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {State as cityState ,reducer as citysReducer, citysFeatureKey} from './citys.reducer'
import {State as serchState ,reducer as serchReducer, serchFeatureKey} from './serch.reducer'
import {State as switchState ,reducer as switchReducer, switchFCFeatureKey} from './switch-fc.reducer'
import {State as darkState ,reducer as darkReducer, darkFeatureKey} from './dark.reducer'
import { InjectionToken } from '@angular/core';

export interface State {
[citysFeatureKey] : cityState,
[serchFeatureKey] : serchState,
[switchFCFeatureKey]:switchState
[darkFeatureKey]:darkState
}






export const  reducers:ActionReducerMap<State> = 
{ 
  [citysFeatureKey] : citysReducer,
  [serchFeatureKey] : serchReducer,
  [switchFCFeatureKey]:switchReducer,
  [darkFeatureKey]:darkReducer
};



export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<State>>('root reducer');

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
