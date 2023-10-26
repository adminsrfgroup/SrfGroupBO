import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IDetailsUsers, initUserState } from '../state/user.state';
import {
    blockedUnblockedUser,
    blockedUnblockedUserFailure,
    blockedUnblockedUserSuccess,
    loadDetailsUser,
    loadDetailsUserFailure,
    loadDetailsUserSuccess,
    updateAuthorityUser,
    updateAuthorityUserFailure,
    updateAuthorityUserSuccess,
} from '../actions/details-user.actions';

export const detailsUserReducer: ActionReducer<IDetailsUsers> = createReducer(
    initUserState.detailsUsers,

    on(loadDetailsUser, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(loadDetailsUserSuccess, (state: IDetailsUsers, action: ReturnType<typeof loadDetailsUserSuccess>) => {
        return {
            ...state,
            entity: action.payload,
            loading: false,
        };
    }),
    on(loadDetailsUserFailure, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: false,
        };
    }),

    on(updateAuthorityUser, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(updateAuthorityUserSuccess, (state: IDetailsUsers, action: ReturnType<typeof updateAuthorityUserSuccess>) => {
        return {
            ...state,
            updateAuthoritiesSuccess: true,
            authorities: action.payload,
            loading: false,
        };
    }),
    on(updateAuthorityUserFailure, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: false,
        };
    }),

    on(blockedUnblockedUser, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: true,
            entity: {
                ...state.entity,
                blocked: '',
            },
        };
    }),
    on(blockedUnblockedUserSuccess, (state: IDetailsUsers, action: ReturnType<typeof blockedUnblockedUserSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: {
                ...state.entity,
                blocked: action.payload?.blockUnblock,
            },
        };
    }),
    on(blockedUnblockedUserFailure, (state: IDetailsUsers) => {
        return {
            ...state,
            loading: false,
        };
    })
);
