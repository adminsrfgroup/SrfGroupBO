import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IListUsers, initUserState } from '../state/user.state';
import { loadListUsers, loadListUsersFailure, loadListUsersSuccess, resetListUsers } from '../actions/list-user.actions';

export const listUserReducer: ActionReducer<IListUsers> = createReducer(
    initUserState.listUsers,
    on(loadListUsers, (state: IListUsers) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListUsersSuccess, (state: IListUsers, action: ReturnType<typeof loadListUsersSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: [...state.entities, ...action.payload.content],
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListUsersFailure, (state: IListUsers, action: ReturnType<typeof loadListUsersFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetListUsers, () => {
        return {
            ...initUserState.listUsers,
        };
    })
);
