import { createAction, props } from '@ngrx/store';

export const addState = createAction(
  '[ForC] add State', props< {switchFC:boolean }>()
  
);

// export const loadSwitchFCsSuccess = createAction(
//   '[SwitchFC] Load SwitchFCs Success',
//   props<{ data: any }>()
// );

// export const loadSwitchFCsFailure = createAction(
//   '[SwitchFC] Load SwitchFCs Failure',
//   props<{ error: any }>()
// );
