import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../../shared/models/user.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

export const loadDetailsUser = createAction('[DetailsUser] Load Details User', props<IdEntity>());

export const loadDetailsUserSuccess = createAction('[User] Load Details User Success', props<{ payload: IUser }>());

export const loadDetailsUserFailure = createAction('[User] Load Details User Failure', props<{ error: any }>());
