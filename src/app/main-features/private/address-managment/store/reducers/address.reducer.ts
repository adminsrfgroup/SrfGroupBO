import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { AddressState, initAddressState } from '../state/init.state';
import { loadListAddress, loadListAddressFailure, loadListAddressSuccess, resetAddress } from '../actions/address.action';

export const addressReducer: ActionReducer<AddressState, Action> = createReducer(
    initAddressState,
    on(loadListAddress, (state: AddressState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListAddressSuccess, (state: AddressState, action: ReturnType<typeof loadListAddressSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListAddressFailure, (state: AddressState, action: ReturnType<typeof loadListAddressFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetAddress, () => {
        return {
            ...initAddressState,
        };
    })
);