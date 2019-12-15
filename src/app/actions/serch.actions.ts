import { createAction, props } from '@ngrx/store';

export const cityToFound = createAction(
  '[Serch] city To Found', props< {result : any } >()
);

// export const loadSerchsSuccess = createAction(
//   '[Serch] Load Serchs Success',
//   props<{ data: any }>()
// );

// export const loadSerchsFailure = createAction(
//   '[Serch] Load Serchs Failure',
//   props<{ error: any }>()
// );
