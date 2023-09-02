import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { ICategory } from '../../../../../shared/models/category.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

export const loadListCategories = createAction('[ListCategories] Load ListCategories', props<Pagination>());

export const loadListCategoriesSuccess = createAction('[ListCategories] Load ListCategories Success', props<{ payload: PageCommon<ICategory> }>());

export const loadListCategoriesFailure = createAction('[ListCategories] Load ListCategories Failure', props<{ error: string }>());

export const setActivePageCategories = createAction('[ListCategories] Set Active Page ListCategories', props<Pagination>());
export const addIndexVisited = createAction('[AddIndexVisited] Add Index Visited for Category AddIndexVisited', props<{ payload: number }>());

export const importCategories = createAction('[ImportCategories] Load ImportCategories');

export const importCategoriesSuccess = createAction('[ImportCategories] Load ImportCategories Success', props<{ payload: string }>());

export const importCategoriesFailure = createAction('[ImportCategories] Load ImportCategories Failure', props<{ error: string }>());

export const fetchOneCategory = createAction('[FetchOneCategory] Load FetchOneCategory', props<IdEntity>());

export const fetchOneCategorySuccess = createAction('[FetchOneCategory] Load FetchOneCategory Success', props<{ payload: ICategory }>());

export const fetchOneCategoryFailure = createAction('[FetchOneCategory] Load FetchOneCategory Failure', props<{ error: string }>());

export const updateCategory = createAction('[UpdateCategory] Update UpdateCategory', props<ICategory>());

export const updateCategorySuccess = createAction('[UpdateCategory] Update UpdateCategory Success', props<{ payload: ICategory }>());

export const updateCategoryFailure = createAction('[UpdateCategory] Update UpdateCategory Failure', props<{ error: string }>());

export const resetCategories = createAction('[ResetCategories] Reset ResetCategories');
