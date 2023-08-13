import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IContactUsState, initSupportState } from '../state/support.state';
import {
  loadListContactUs,
  loadListContactUsFailure,
  loadListContactUsSuccess,
  resetListContactUs
} from '../actions/contact-us.actions';

export const contactUsReducer: ActionReducer<IContactUsState> = createReducer(
    initSupportState.contactUs,
    on(loadListContactUs, (state: IContactUsState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListContactUsSuccess, (state: IContactUsState, action: ReturnType<typeof loadListContactUsSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListContactUsFailure, (state: IContactUsState, action: ReturnType<typeof loadListContactUsFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetListContactUs, () => {
        return {
            ...initSupportState.contactUs,
        };
    })
);
