import { createAction, props } from '@ngrx/store';
import {PageCommon} from "../../../../../shared/models/page.common";
import {IUser} from "../../../../../shared/models/user.model";

export const loadListUsers = createAction(
  '[ListUser] Load ListUsers'
);

export const loadListUsersSuccess = createAction(
  '[ListUser] Load ListUsers Success',
  props<{ payload: PageCommon<IUser> }>()
);

export const loadListUsersFailure = createAction(
  '[ListUser] Load ListUsers Failure',
  props<{ error: any }>()
);

export const resetListUsers = createAction(
  '[ListUser] Reset ListUsers'
);
