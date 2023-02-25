import { createAction, props } from '@ngrx/store';
import { ILogin, IResponseLogin } from '../../models/login.model';

export enum LoginActions {
    Login = '[Login] Load Login',
    LoginSuccess = '[Login] Load Login Success',
    LoginFailure = '[Login] Load Login Failure',
    ResetLogin = '[Reset Login] reset login',
}

export const loginAction = createAction(LoginActions.Login, props<ILogin>());

export const loginActionSuccess = createAction(LoginActions.LoginSuccess, props<{ payload: IResponseLogin }>());

export const loginActionFailure = createAction(LoginActions.LoginFailure, props<{ error: any }>());

export const resetLoginAction = createAction(LoginActions.ResetLogin);
