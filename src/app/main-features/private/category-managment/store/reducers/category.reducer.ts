import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CategoryState, initCategoryState } from '../state/init.state';
import {
    addIndexVisited,
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
            entities: [...state.entities, ...action.payload.content],
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
            isFirstLoading: false,
        };
    }),
    on(loadListCategoriesFailure, (state: CategoryState, action: ReturnType<typeof loadListCategoriesFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
            isFirstLoading: false,
        };
    }),

    on(addIndexVisited, (state: CategoryState, action: ReturnType<typeof addIndexVisited>) => {
        return {
            ...state,
            listIndexVisited: [...state.listIndexVisited, ...[action.payload]],
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
