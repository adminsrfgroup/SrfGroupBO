import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IRoleAuthority } from '../state/init.state';
import { initRoleState } from '../../../role-managment/store/state/init.state';
import {
    addRole,
    addRoleFailure,
    addRoleSuccess,
    fetchOneRole,
    loadfOneRoleSuccess,
    loadListRoles,
    loadListRolesFailure,
    loadListRolesSuccess,
    loadOneRoleFailure,
    resetRoles,
    setActivePageRoles,
    updateRole,
    updateRoleFailure,
    updateRoleSuccess,
} from '../actions/role.action';

export const authorityReducer: ActionReducer<IRoleAuthority, Action> = createReducer(
    initRoleState.authority,
    on(loadListRoles, (state: IRoleAuthority) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListRolesSuccess, (state: IRoleAuthority, action: ReturnType<typeof loadListRolesSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListRolesFailure, (state: IRoleAuthority, action: ReturnType<typeof loadListRolesFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(setActivePageRoles, (state: IRoleAuthority, action: ReturnType<typeof setActivePageRoles>) => {
        return {
            ...state,
            loadingEntities: true,
            activePage: action.page,
        };
    }),

    on(fetchOneRole, (state: IRoleAuthority) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(loadfOneRoleSuccess, (state: IRoleAuthority, action: ReturnType<typeof loadfOneRoleSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
        };
    }),
    on(loadOneRoleFailure, (state: IRoleAuthority, action: ReturnType<typeof loadOneRoleFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(updateRole, (state: IRoleAuthority) => {
        return {
            ...state,
            loading: true,
            updateSuccess: false,
        };
    }),
    on(updateRoleSuccess, (state: IRoleAuthority, action: ReturnType<typeof updateRoleSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            updateSuccess: true,
        };
    }),
    on(updateRoleFailure, (state: IRoleAuthority, action: ReturnType<typeof updateRoleFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(addRole, (state: IRoleAuthority) => {
        return {
            ...state,
            loading: true,
            addSuccess: false,
        };
    }),
    on(addRoleSuccess, (state: IRoleAuthority, action: ReturnType<typeof addRoleSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            addSuccess: true,
        };
    }),
    on(addRoleFailure, (state: IRoleAuthority, action: ReturnType<typeof addRoleFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(resetRoles, () => {
        return {
            ...initRoleState.authority,
        };
    })
);
