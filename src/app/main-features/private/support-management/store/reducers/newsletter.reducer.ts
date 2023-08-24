import { ActionReducer, createReducer, on } from '@ngrx/store';
import { INewsLetterState, initSupportState } from '../state/support.state';
import { loadListNewsLetter, loadListNewsLetterFailure, loadListNewsLetterSuccess, resetNewsLetter } from '../actions/newsletter.actions';

export const newsLetterReducer: ActionReducer<INewsLetterState> = createReducer(
    initSupportState.newsLetter,
    on(loadListNewsLetter, (state: INewsLetterState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListNewsLetterSuccess, (state: INewsLetterState, action: ReturnType<typeof loadListNewsLetterSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListNewsLetterFailure, (state: INewsLetterState, action: ReturnType<typeof loadListNewsLetterFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetNewsLetter, () => {
        return {
            ...initSupportState.newsLetter,
        };
    })
);
