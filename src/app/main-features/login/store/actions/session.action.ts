import { createAction, props } from '@ngrx/store';
import { IUser } from '../../../../shared/models/user.model';

enum SessionActions {
    Session = '[SESSION] load session',
    SessionSuccess = '[SESSION] session success',
    SessionFailure = '[SESSION] session failure',

    Logout = '[LOGOUT] load logout',
}

export const sessionAction = createAction(SessionActions.Session);
export const sessionActionSuccess = createAction(SessionActions.SessionSuccess, props<{ payload: IUser }>());
export const sessionActionFailure = createAction(SessionActions.SessionFailure, props<{ error: string }>());

export const logoutAction = createAction(SessionActions.Logout);
