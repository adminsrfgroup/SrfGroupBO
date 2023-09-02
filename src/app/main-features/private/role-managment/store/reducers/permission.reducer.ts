import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IRolePermission } from '../state/init.state';
import { initRoleState } from '../../../role-managment/store/state/init.state';
import {
    addPermission,
    addPermissionFailure,
    addPermissionSuccess,
    loadListPermissions,
    loadListPermissionsFailure,
    loadListPermissionsSuccess,
    resetListPermissions,
} from '../actions/permission.action';

export const permissionReducer: ActionReducer<IRolePermission, Action> = createReducer(
    initRoleState.permission,
    on(addPermission, (state: IRolePermission) => {
        return {
            ...state,
            loading: true,
            addSuccess: false,
        };
    }),
    on(addPermissionSuccess, (state: IRolePermission, action: ReturnType<typeof addPermissionSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            addSuccess: true,
        };
    }),
    on(addPermissionFailure, (state: IRolePermission, action: ReturnType<typeof addPermissionFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(loadListPermissions, (state: IRolePermission) => {
        return {
            ...state,
            loadingEntities: true,
            totalPages: 0,
            totalItems: 0,
        };
    }),
    on(loadListPermissionsSuccess, (state: IRolePermission, action: ReturnType<typeof loadListPermissionsSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
        };
    }),
    on(loadListPermissionsFailure, (state: IRolePermission, action: ReturnType<typeof loadListPermissionsFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    }),

    on(resetListPermissions, () => {
        return {
            ...initRoleState.permission,
        };
    })
);
