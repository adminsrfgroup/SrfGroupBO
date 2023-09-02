import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IFaq } from '../../../../../shared/models/faq.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

export const loadListFaq = createAction('[ListFaq] Load ListFaq', props<Pagination>());

export const loadListFaqSuccess = createAction('[ListFaq] Load ListFaq Success', props<{ payload: PageCommon<IFaq> }>());

export const loadListFaqFailure = createAction('[ListFaq] Load ListFaq Failure', props<{ error: string }>());

export const addFaq = createAction('[AddFaq] Load AddFaq', props<IFaq>());

export const addFaqSuccess = createAction('[AddFaq] Load AddFaq Success', props<{ payload: IFaq }>());

export const addFaqFailure = createAction('[AddFaq] Load AddFaq Failure', props<{ error: string }>());

export const updateFaq = createAction('[UpdateFaq] Load UpdateFaq', props<IFaq>());

export const updateFaqSuccess = createAction('[UpdateFaq] Load UpdateFaq Success', props<{ payload: IFaq }>());

export const updateFaqFailure = createAction('[UpdateFaq] Load UpdateFaq Failure', props<{ error: string }>());

export const fetchOneFaq = createAction('[FetchOneFaq] Load FetchOneFaq', props<IdEntity>());

export const fetchOneFaqSuccess = createAction('[FetchOneFaq] Load FetchOneFaq Success', props<{ payload: IFaq }>());

export const fetchOneFaqFailure = createAction('[FetchOneFaq] Load FetchOneFaq Failure', props<{ error: string }>());

export const resetFaq = createAction('[Faq] Reset Faq');
