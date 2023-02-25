import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../state/login.state';

export const loginSelectKey = 'login';
export const selectLoginState = createFeatureSelector<LoginState>(loginSelectKey);
export const selectorLoadingLogin = createSelector(selectLoginState, (state: LoginState) => state.loading);
export const selectorErrorMessageLogin = createSelector(selectLoginState, (state: LoginState) => state.errorMessage);
export const selectorTokenLogin = createSelector(selectLoginState, (state: LoginState) => {
    return {
        token: state.token,
        refreshToken: state.token,
    };
});
export const selectorRefreshTokenLogin = createSelector(selectLoginState, (state: LoginState) => state.refreshToken);
