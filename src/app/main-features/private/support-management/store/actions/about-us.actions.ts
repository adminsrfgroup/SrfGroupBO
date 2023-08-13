import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IContactUs } from '../../../../../shared/models/contact-us.model';
import {IAboutUs} from "../../../../../shared/models/about-us.model";

export const loadListAboutUs = createAction('[ListAboutUs] Load ListAboutUs', props<Pagination>());

export const loadListAboutUsSuccess = createAction('[ListAboutUs] Load ListAboutUs Success', props<{ payload: PageCommon<IAboutUs> }>());

export const loadListAboutUsFailure = createAction('[ListAboutUs] Load ListAboutUs Failure', props<{ error: any }>());


export const addAboutUs = createAction('[AddAboutUs] Load AddAboutUs', props<IAboutUs>());

export const addAboutUsSuccess = createAction('[AddAboutUs] Load AddAboutUs Success', props<{ payload: IAboutUs }>());

export const addAboutUsFailure = createAction('[AddAboutUs] Load AddAboutUs Failure', props<{ error: any }>());

export const resetAboutUs = createAction('[ResetAboutUs] Reset ResetAboutUs');
