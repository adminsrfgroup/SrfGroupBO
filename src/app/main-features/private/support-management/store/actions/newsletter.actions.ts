import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { INewsLetter } from '../../../../../shared/models/newsletter.model';

export const loadListNewsLetter = createAction('[ListNewsLetter] Load ListNewsLetter', props<Pagination>());

export const loadListNewsLetterSuccess = createAction('[ListNewsLetter] Load ListNewsLetter Success', props<{ payload: PageCommon<INewsLetter> }>());

export const loadListNewsLetterFailure = createAction('[ListNewsLetter] Load ListNewsLetter Failure', props<{ error: any }>());

export const resetNewsLetter = createAction('[NewsLetter] Reset ListNewsLetter');
