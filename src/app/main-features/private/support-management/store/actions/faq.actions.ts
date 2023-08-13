import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import {INewsLetter} from "../../../../../shared/models/newsletter.model";
import {IFaq} from "../../../../../shared/models/faq.model";

export const loadListFaq = createAction('[ListFaq] Load ListFaq', props<Pagination>());

export const loadListFaqSuccess = createAction('[ListFaq] Load ListFaq Success', props<{ payload: PageCommon<IFaq> }>());

export const loadListFaqFailure = createAction('[ListFaq] Load ListFaq Failure', props<{ error: any }>());

export const addFaq = createAction('[AddFaq] Load AddFaq', props<IFaq>());

export const addFaqSuccess = createAction('[AddFaq] Load AddFaq Success', props<{ payload: IFaq }>());

export const addFaqFailure = createAction('[AddFaq] Load AddFaq Failure', props<{ error: any }>());

export const resetFaq = createAction('[Faq] Reset Faq');
