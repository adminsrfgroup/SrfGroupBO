import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loadListAddress, loadListAddressFailure, loadListAddressSuccess, resetAddress } from '../../../address-managment/store/actions/address.action';
import { CategoryState, initCategoryState } from '../state/init.state';
import { loadListCategories, loadListCategoriesFailure, loadListCategoriesSuccess, resetCategories } from '../actions/category.action';

export const categoryReducer: ActionReducer<CategoryState, Action> = createReducer(
    initCategoryState,
    on(loadListCategories, (state: CategoryState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListCategoriesSuccess, (state: CategoryState, action: ReturnType<typeof loadListCategoriesSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListCategoriesFailure, (state: CategoryState, action: ReturnType<typeof loadListCategoriesFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetCategories, () => {
        return {
            ...initCategoryState,
        };
    })
);
