import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RoleState } from '../state/init.state';

export const roleSelectKey = 'role';

export const selectRoleState = createFeatureSelector<RoleState>(roleSelectKey);

export const selectorRole = createSelector(selectRoleState, (state: RoleState) => state.authority);
export const selectorPermission = createSelector(selectRoleState, (state: RoleState) => state.permission);
