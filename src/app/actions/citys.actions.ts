import { createAction, props } from '@ngrx/store';


export const addCity = createAction(
  '[FavCities] add City' ,props< {cityId: any }>()
)
;
export const removeCity = createAction(
  '[FavCities] remove City' ,props< {cityId: any }>()
);



// export const loadCityssFailure = createAction(
//   '[Citys] Load Cityss Failure',
//   props<{ error: any }>()
// );
