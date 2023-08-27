import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { loadListAddress, loadListAddressFailure, loadListAddressSuccess, resetAddress } from '../../../address-managment/store/actions/address.action';
import { CategoryState, initCategoryState } from '../state/init.state';
import {
    fetchOneCategory,
    fetchOneCategoryFailure,
    fetchOneCategorySuccess,
    importCategories,
    importCategoriesFailure,
    importCategoriesSuccess,
    loadListCategories,
    loadListCategoriesFailure,
    loadListCategoriesSuccess,
    resetCategories,
    updateCategory,
    updateCategoryFailure,
    updateCategorySuccess,
} from '../actions/category.action';

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

    on(importCategories, (state: CategoryState) => {
        return {
            ...state,
            loading: false,
        };
    }),
    on(importCategoriesSuccess, (state: CategoryState, action: ReturnType<typeof importCategoriesSuccess>) => {
        return {
            ...state,
            loading: false,
        };
    }),
    on(importCategoriesFailure, (state: CategoryState, action: ReturnType<typeof importCategoriesFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(fetchOneCategory, (state: CategoryState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(fetchOneCategorySuccess, (state: CategoryState, action: ReturnType<typeof fetchOneCategorySuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
        };
    }),
    on(fetchOneCategoryFailure, (state: CategoryState, action: ReturnType<typeof fetchOneCategoryFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(updateCategory, (state: CategoryState) => {
        return {
            ...state,
            loading: true,
            updateSuccess: false,
        };
    }),
    on(updateCategorySuccess, (state: CategoryState, action: ReturnType<typeof updateCategorySuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            updateSuccess: true,
        };
    }),
    on(updateCategoryFailure, (state: CategoryState, action: ReturnType<typeof updateCategoryFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(resetCategories, () => {
        return {
            ...initCategoryState,
        };
    })
);
