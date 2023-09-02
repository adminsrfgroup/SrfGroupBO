import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IUser } from '../../../../../shared/models/user.model';

export const loadListUsers = createAction('[ListUser] Load ListUsers', props<Pagination>());

export const loadListUsersSuccess = createAction('[ListUser] Load ListUsers Success', props<{ payload: PageCommon<IUser> }>());

export const loadListUsersFailure = createAction('[ListUser] Load ListUsers Failure', props<{ error: string }>());

export const resetListUsers = createAction('[ListUser] Reset ListUsers');
