import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { initLoginState, LoginState } from '../state/login.state';
import * as fromLoginActions from '../actions/login.action';

export const loginReducer: ActionReducer<LoginState, Action> = createReducer(
    initLoginState,
    on(fromLoginActions.loginAction, (state: LoginState, action: ReturnType<typeof fromLoginActions.loginAction>) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(fromLoginActions.loginActionSuccess, (state: LoginState, action: ReturnType<typeof fromLoginActions.loginActionSuccess>) => {
        return {
            ...state,
            loading: false,
            token: action.payload.token,
            refreshToken: action.payload.token,
        };
    }),
    on(fromLoginActions.loginActionFailure, (state: LoginState, action: ReturnType<typeof fromLoginActions.loginActionFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),
    on(fromLoginActions.resetLoginAction, () => {
        return {
            ...initLoginState,
        };
    })
);
