import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { initUserState, UserState } from '../state/user.state';
import { loadListUsers, loadListUsersFailure, loadListUsersSuccess, resetListUsers } from '../actions/list-user.actions';
import { loadDetailsUser, loadDetailsUserFailure, loadDetailsUserSuccess, updateAuthorityUser, updateAuthorityUserFailure, updateAuthorityUserSuccess } from '../actions/details-user.actions';

export const userReducer: ActionReducer<UserState, Action> = createReducer(
    initUserState,
    on(loadListUsers, (state: UserState) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListUsersSuccess, (state: UserState, action: ReturnType<typeof loadListUsersSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: [...state.entities, ...action.payload.content],
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListUsersFailure, (state: UserState, action: ReturnType<typeof loadListUsersFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(loadDetailsUser, (state: UserState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(loadDetailsUserSuccess, (state: UserState, action: ReturnType<typeof loadDetailsUserSuccess>) => {
        return {
            ...state,
            entity: action.payload,
            loading: false,
        };
    }),
    on(loadDetailsUserFailure, (state: UserState) => {
        return {
            ...state,
            loading: false,
        };
    }),

    on(updateAuthorityUser, (state: UserState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(updateAuthorityUserSuccess, (state: UserState, action: ReturnType<typeof updateAuthorityUserSuccess>) => {
        return {
            ...state,
            updateAuthoritiesSuccess: true,
            authorities: action.payload,
            loading: false,
        };
    }),
    on(updateAuthorityUserFailure, (state: UserState) => {
        return {
            ...state,
            loading: false,
        };
    }),

    on(resetListUsers, () => {
        return {
            ...initUserState,
        };
    })
);
