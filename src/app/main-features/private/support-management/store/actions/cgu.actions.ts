import { createAction, props } from '@ngrx/store';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { IAboutUs } from '../../../../../shared/models/about-us.model';

export const loadListCgu = createAction('[ListCguLetter] Load ListCguLetter');

export const loadListCguSuccess = createAction('[ListCguLetter] Load ListCguLetter Success', props<{ payload: ICgu }>());

export const loadListCguFailure = createAction('[ListCguLetter] Load ListCguLetter Failure', props<{ error: string }>());

export const addCgu = createAction('[AddCgu] Add AddCgu', props<ICgu>());

export const addCguSuccess = createAction('[AddCgu] Add AddCgu Success', props<{ payload: ICgu }>());

export const addCguFailure = createAction('[AddCgu] Add AddCgu Failure', props<{ error: string }>());

export const updateCgu = createAction('[UpdateCgu] Update UpdateCgu', props<ICgu>());

export const updateCguSuccess = createAction('[UpdateCgu] Update UpdateCgu Success', props<{ payload: ICgu }>());

export const updateCguFailure = createAction('[UpdateCgu] Update UpdateCgu Failure', props<{ error: string }>());

export const resetCgu = createAction('[CguLetter] Reset CguLetter');
