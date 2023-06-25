import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from '../state/init.state';

export const categorySelectKey = 'category';

export const selectCategoryState = createFeatureSelector<CategoryState>(categorySelectKey);

export const selectorCategory = createSelector(selectCategoryState, (state: CategoryState) => state);
