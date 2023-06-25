import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../../shared/models/user.model';
import { IIdEntity } from '../../../../../shared/models/id-entity.model';

export const loadDetailsUser = createAction('[DetailsUser] Load Details User', props<IIdEntity>());

export const loadDetailsUserSuccess = createAction('[User] Load Details User Success', props<{ payload: IUser }>());

export const loadDetailsUserFailure = createAction('[User] Load Details User Failure', props<{ error: any }>());
