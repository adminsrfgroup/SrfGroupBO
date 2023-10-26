import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../state/user.state';

export const userSelectKey = 'user';

export const selectUserState = createFeatureSelector<UserState>(userSelectKey);
export const selectorListUser = createSelector(selectUserState, (state: UserState) => state.listUsers);
export const selectorDetailsUser = createSelector(selectUserState, (state: UserState) => state.detailsUsers);
