import { createAction, props } from '@ngrx/store';

export const loadListLog = createAction('[ListLog] Load ListLog');

export const loadListLogSuccess = createAction('[ListLog] Load ListLog Success', props<{ payload: any }>());

export const loadListLogFailure = createAction('[ListLog] Load ListLog Failure', props<{ error: any }>());
