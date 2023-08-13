import { ActionReducer, createReducer, on } from '@ngrx/store';
import {IAboutUsState, IFaqState, initSupportState} from '../state/support.state';
import {
  addFaq, addFaqFailure,
  addFaqSuccess,
  loadListFaq,
  loadListFaqFailure,
  loadListFaqSuccess,
  resetFaq
} from "../actions/faq.actions";
import {addAboutUs, addAboutUsFailure, addAboutUsSuccess} from "../actions/about-us.actions";

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
        addSuccess: false
      };
    }),
    on(addFaqSuccess, (state: IFaqState, action: ReturnType<typeof addFaqSuccess>) => {
      return {
        ...state,
        loading: false,
        entity: action.payload,
        addSuccess: true
      };
    }),
    on(addFaqFailure, (state: IFaqState, action: ReturnType<typeof addFaqFailure>) => {
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
