import { ActionReducer, createReducer, on } from '@ngrx/store';
import {IAboutUsState, initSupportState} from '../state/support.state';
import {
  addAboutUs, addAboutUsFailure, addAboutUsSuccess,
  loadListAboutUs,
  loadListAboutUsFailure,
  loadListAboutUsSuccess, resetAboutUs,
} from "../actions/about-us.actions";

export const aboutUsReducer: ActionReducer<IAboutUsState> = createReducer(
    initSupportState.aboutUs,
    on(loadListAboutUs, (state: IAboutUsState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListAboutUsSuccess, (state: IAboutUsState, action: ReturnType<typeof loadListAboutUsSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListAboutUsFailure, (state: IAboutUsState, action: ReturnType<typeof loadListAboutUsFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),


    on(addAboutUs, (state: IAboutUsState) => {
      return {
        ...state,
        loading: true,
        addSuccess: false
      };
    }),
    on(addAboutUsSuccess, (state: IAboutUsState, action: ReturnType<typeof addAboutUsSuccess>) => {
      return {
        ...state,
        loading: false,
        entity: action.payload,
        addSuccess: true
      };
    }),
    on(addAboutUsFailure, (state: IAboutUsState, action: ReturnType<typeof addAboutUsFailure>) => {
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    }),

    on(resetAboutUs, () => {
        return {
            ...initSupportState.aboutUs,
        };
    })
);
