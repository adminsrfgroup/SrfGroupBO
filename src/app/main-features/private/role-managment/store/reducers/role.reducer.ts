import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { RoleState } from '../state/init.state';
import { initRoleState } from '../../../role-managment/store/state/init.state';
import {
  fetchOneRole, loadfOneRoleSuccess,
  loadListRoles,
  loadListRolesFailure,
  loadListRolesSuccess, loadOneRoleFailure,
  resetRoles,
  setActivePageRoles, updateRole, updateRoleFailure, updateRoleSuccess
} from '../actions/role.action';
import { addPermission, addPermissionFailure, addPermissionSuccess, loadListPermissions, loadListPermissionsFailure, loadListPermissionsSuccess } from '../actions/permission.action';

export const roleReducer: ActionReducer<RoleState, Action> = createReducer(
    initRoleState,
    on(loadListRoles, (state: RoleState) => {
        return {
            ...state,
            authority: {
                ...state.authority,
                loadingEntities: true,
                totalPages: 0,
                totalItems: 0,
            },
        };
    }),
    on(loadListRolesSuccess, (state: RoleState, action: ReturnType<typeof loadListRolesSuccess>) => {
        return {
            ...state,
            authority: {
                ...state.authority,
                loadingEntities: false,
                entities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
            },
        };
    }),
    on(loadListRolesFailure, (state: RoleState, action: ReturnType<typeof loadListRolesFailure>) => {
        return {
            ...state,
            authority: {
                ...state.authority,
                loadingEntities: false,
                errorMessage: action.error,
            },
        };
    }),

    on(setActivePageRoles, (state: RoleState, action: ReturnType<typeof setActivePageRoles>) => {
        return {
            ...state,
            authority: {
                ...state.authority,
                loadingEntities: true,
                activePage: action.page,
            },
        };
    }),


    on(fetchOneRole, (state: RoleState) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: true,
        }
      };
    }),
    on(loadfOneRoleSuccess, (state: RoleState, action: ReturnType<typeof loadfOneRoleSuccess>) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: false,
          entity: action.payload,
        }
      };
    }),
    on(loadOneRoleFailure, (state: RoleState, action: ReturnType<typeof loadOneRoleFailure>) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: false,
          errorMessage: action.error,
        }
      };
    }),

    on(updateRole, (state: RoleState) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: true,
          updateSuccess: false,
        }
      };
    }),
    on(updateRoleSuccess, (state: RoleState, action: ReturnType<typeof updateRoleSuccess>) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: false,
          entity: action.payload,
          updateSuccess: true
        }
      };
    }),
    on(updateRoleFailure, (state: RoleState, action: ReturnType<typeof updateRoleFailure>) => {
      return {
        ...state,
        authority: {
          ...state.authority,
          loading: false,
          errorMessage: action.error,
        }
      };
    }),

    on(resetRoles, () => {
        return {
            ...initRoleState,
        };
    }),

    on(addPermission, (state: RoleState) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loading: true,
                addSuccess: false,
            },
        };
    }),
    on(addPermissionSuccess, (state: RoleState, action: ReturnType<typeof addPermissionSuccess>) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loading: false,
                entity: action.payload,
                addSuccess: true,
            },
        };
    }),
    on(addPermissionFailure, (state: RoleState, action: ReturnType<typeof addPermissionFailure>) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loading: false,
                errorMessage: action.error,
            },
        };
    }),

    on(loadListPermissions, (state: RoleState) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loadingEntities: true,
                totalPages: 0,
                totalItems: 0,
            },
        };
    }),
    on(loadListPermissionsSuccess, (state: RoleState, action: ReturnType<typeof loadListPermissionsSuccess>) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loadingEntities: false,
                entities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
            },
        };
    }),
    on(loadListPermissionsFailure, (state: RoleState, action: ReturnType<typeof loadListPermissionsFailure>) => {
        return {
            ...state,
            permission: {
                ...state.permission,
                loadingEntities: false,
                errorMessage: action.error,
            },
        };
    })
);
