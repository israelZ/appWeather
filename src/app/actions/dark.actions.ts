import { createAction, props } from '@ngrx/store';

export const loadDarks = createAction(
  '[Dark] Load Darks',props<{isDark:boolean}>()
);

