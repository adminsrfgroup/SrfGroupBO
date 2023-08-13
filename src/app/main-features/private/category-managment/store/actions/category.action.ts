import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { ICategory } from '../../../../../shared/models/category.model';

export const loadListCategories = createAction('[ListCategories] Load ListCategories', props<Pagination>());

export const loadListCategoriesSuccess = createAction('[ListCategories] Load ListCategories Success', props<{ payload: PageCommon<ICategory> }>());

export const loadListCategoriesFailure = createAction('[ListCategories] Load ListCategories Failure', props<{ error: any }>());

export const setActivePageCategories = createAction('[ListCategories] Set Active Page ListCategories', props<Pagination>());

export const importCategories = createAction('[ImportCategories] Load ImportCategories');

export const importCategoriesSuccess = createAction('[ImportCategories] Load ImportCategories Success', props<{ payload: string }>());

export const importCategoriesFailure = createAction('[ImportCategories] Load ImportCategories Failure', props<{ error: any }>());

export const resetCategories = createAction('[ResetCategories] Reset ResetCategories');
