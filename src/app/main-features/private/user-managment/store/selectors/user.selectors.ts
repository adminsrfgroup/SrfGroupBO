import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserState} from "../state/user.state";

export const userSelectKey = 'user';

export const selectUserState = createFeatureSelector<UserState>(userSelectKey);
export const selectorUser = createSelector(selectUserState, (state: UserState) => state);
