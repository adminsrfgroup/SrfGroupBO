import { createFeatureSelector, createSelector } from '@ngrx/store';
import {UserState} from "../state/user.state";

export const listUsersSelectKey = 'listUsers';

export const selectUserState = createFeatureSelector<UserState>(listUsersSelectKey);
export const selectorLoadingUser = createSelector(selectUserState, (state: UserState) => state.loadingEntities);
export const selectorEntitiesUser = createSelector(selectUserState, (state: UserState) => state.entities);
export const selectorTotalElementsUser = createSelector(selectUserState, (state: UserState) => state.totalElements);
export const selectorTotalPagesUser = createSelector(selectUserState, (state: UserState) => state.totalPages);
