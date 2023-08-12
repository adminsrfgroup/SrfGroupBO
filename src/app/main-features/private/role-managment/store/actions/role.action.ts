import {createAction, props} from "@ngrx/store";
import {PageCommon, Pagination} from "../../../../../shared/models/page.common";
import {IAuthority} from "../../../../../shared/models/authority.model";

export const loadListRoles = createAction('[ListRoles] Load ListRoles', props<Pagination>());
export const loadListRolesSuccess = createAction('[ListRoles] Load ListRoles Success', props<{ payload: PageCommon<IAuthority> }>());
export const loadListRolesFailure = createAction('[ListRoles] Load ListRoles Failure', props<{ error: any }>());
export const setActivePageRoles = createAction('[ListRoles] Set Active Page ListRoles', props<Pagination>());
export const resetListRoles = createAction('[ListRoles] Reset ListRoles');
