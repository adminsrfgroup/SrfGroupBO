import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { RoleState } from '../state/init.state';
import { authorityReducer } from './role.reducer';
import { permissionReducer } from './permission.reducer';

export const rolePermissionReducer: ActionReducer<RoleState, Action> = combineReducers({
    authority: authorityReducer,
    permission: permissionReducer,
});
