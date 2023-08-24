import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IAboutUsState, IFaqState, initSupportState } from '../state/support.state';
import {
    addFaq,
    addFaqFailure,
    addFaqSuccess,
    fetchOneFaq,
    fetchOneFaqFailure,
    fetchOneFaqSuccess,
    loadListFaq,
    loadListFaqFailure,
    loadListFaqSuccess,
    resetFaq,
    updateFaq,
    updateFaqFailure,
    updateFaqSuccess,
} from '../actions/faq.actions';

export const faqReducer: ActionReducer<IFaqState> = createReducer(
    initSupportState.faq,
    on(loadListFaq, (state: IFaqState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListFaqSuccess, (state: IFaqState, action: ReturnType<typeof loadListFaqSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListFaqFailure, (state: IFaqState, action: ReturnType<typeof loadListFaqFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(addFaq, (state: IFaqState) => {
        return {
            ...state,
            loading: true,
            addSuccess: false,
        };
    }),
    on(addFaqSuccess, (state: IFaqState, action: ReturnType<typeof addFaqSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            addSuccess: true,
        };
    }),
    on(addFaqFailure, (state: IFaqState, action: ReturnType<typeof addFaqFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(fetchOneFaq, (state: IFaqState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(fetchOneFaqSuccess, (state: IFaqState, action: ReturnType<typeof fetchOneFaqSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
        };
    }),
    on(fetchOneFaqFailure, (state: IFaqState, action: ReturnType<typeof fetchOneFaqFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(updateFaq, (state: IFaqState) => {
        return {
            ...state,
            loading: true,
            updateSuccess: false,
        };
    }),
    on(updateFaqSuccess, (state: IFaqState, action: ReturnType<typeof updateFaqSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            updateSuccess: true,
        };
    }),
    on(updateFaqFailure, (state: IFaqState, action: ReturnType<typeof updateFaqFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(resetFaq, () => {
        return {
            ...initSupportState.faq,
        };
    })
);
