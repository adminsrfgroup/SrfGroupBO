import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IPermission } from '../../../../../shared/models/permission.model';
import { IOffer } from '../../../../../shared/models/offer.model';

export const addPermission = createAction('[AddPermission] Load AddPermission', props<IPermission>());
export const addPermissionSuccess = createAction('[AddPermission] Load AddPermission Success', props<{ payload: IPermission }>());
export const addPermissionFailure = createAction('[AddPermission] Load AddPermission Failure', props<{ error: any }>());
export const loadListPermissions = createAction('[ListPermissions] Load ListPermissions', props<Pagination>());
export const loadListPermissionsSuccess = createAction('[ListPermissions] Load ListPermissions Success', props<{ payload: PageCommon<IPermission> }>());
export const loadListPermissionsFailure = createAction('[ListPermissions] Load ListPermissions Failure', props<{ error: any }>());
export const setActivePageListPermissions = createAction('[ListPermissions] Set Active Page ListPermissions', props<Pagination>());
export const resetListPermissions = createAction('[ListPermission] Reset ListPermission');
