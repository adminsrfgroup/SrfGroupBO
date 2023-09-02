import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../../shared/models/user.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { UpdateUserAuthorities } from '../../models/update-user-authorities';
import {IAuthority} from "../../../../../shared/models/authority.model";

export const loadDetailsUser = createAction('[DetailsUser] Load Details User', props<IdEntity>());

export const loadDetailsUserSuccess = createAction('[User] Load Details User Success', props<{ payload: IUser }>());

export const loadDetailsUserFailure = createAction('[User] Load Details User Failure', props<{ error: string }>());

export const updateAuthorityUser = createAction('[UpdateAuthorityUser] Update UpdateAuthorityUser', props<UpdateUserAuthorities>());

export const updateAuthorityUserSuccess = createAction('[UpdateAuthorityUser] Update UpdateAuthorityUser Success', props<{ payload: IAuthority[] }>());

export const updateAuthorityUserFailure = createAction('[UpdateAuthorityUser] Update UpdateAuthorityUser Failure', props<{ error: string }>());
