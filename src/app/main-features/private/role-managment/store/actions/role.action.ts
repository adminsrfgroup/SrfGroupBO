import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IAuthority } from '../../../../../shared/models/authority.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

export const loadListRoles = createAction('[ListRoles] Load ListRoles', props<Pagination>());
export const loadListRolesSuccess = createAction('[ListRoles] Load ListRoles Success', props<{ payload: PageCommon<IAuthority> }>());
export const loadListRolesFailure = createAction('[ListRoles] Load ListRoles Failure', props<{ error: string }>());
export const fetchOneRole = createAction('[LoadOneRole] Load LoadOneRole', props<IdEntity>());
export const loadfOneRoleSuccess = createAction('[LoadOneRole] Load LoadOneRole Success', props<{ payload: IAuthority }>());
export const loadOneRoleFailure = createAction('[LoadOneRole] Load LoadOneRole Failure', props<{ error: string }>());
export const updateRole = createAction('[UpdateRole] Update UpdateRole', props<IAuthority>());
export const updateRoleSuccess = createAction('[UpdateRole] Update UpdateRole Success', props<{ payload: IAuthority }>());
export const updateRoleFailure = createAction('[UpdateRole] Update UpdateRole Failure', props<{ error: string }>());

export const addRole = createAction('[AddRole] Add AddRole', props<IAuthority>());
export const addRoleSuccess = createAction('[AddRole] Add AddRole Success', props<{ payload: IAuthority }>());
export const addRoleFailure = createAction('[AddRole] Add AddRole Failure', props<{ error: string }>());

export const setActivePageRoles = createAction('[ListRoles] Set Active Page ListRoles', props<Pagination>());
export const resetRoles = createAction('[ListRoles] Reset ListRoles');
