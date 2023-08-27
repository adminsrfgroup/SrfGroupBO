import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IAboutUsState, ICguState, initSupportState } from '../state/support.state';
import { addCgu, addCguFailure, addCguSuccess, loadListCgu, loadListCguFailure, loadListCguSuccess, resetCgu, updateCgu, updateCguFailure, updateCguSuccess } from '../actions/cgu.actions';
import { addAboutUs, addAboutUsFailure, addAboutUsSuccess } from '../actions/about-us.actions';

export const cguReducer: ActionReducer<ICguState> = createReducer(
    initSupportState.cgu,
    on(loadListCgu, (state: ICguState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(loadListCguSuccess, (state: ICguState, action: ReturnType<typeof loadListCguSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
        };
    }),
    on(loadListCguFailure, (state: ICguState, action: ReturnType<typeof loadListCguFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(addCgu, (state: ICguState) => {
        return {
            ...state,
            loading: true,
            addSuccess: false,
        };
    }),
    on(addCguSuccess, (state: ICguState, action: ReturnType<typeof addCguSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            addSuccess: true,
        };
    }),
    on(addCguFailure, (state: ICguState, action: ReturnType<typeof addCguFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(updateCgu, (state: ICguState) => {
        return {
            ...state,
            loading: true,
            updateSuccess: false,
        };
    }),
    on(updateCguSuccess, (state: ICguState, action: ReturnType<typeof updateCguSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            updateSuccess: true,
        };
    }),
    on(updateCguFailure, (state: ICguState, action: ReturnType<typeof updateCguFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(resetCgu, () => {
        return {
            ...initSupportState.cgu,
        };
    })
);
