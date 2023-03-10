import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { LoginState } from '../../main-features/login/store/state/login.state';
import { loginReducer } from '../../main-features/login/store/reducers/login.reducer';
import { LoginEffects } from 'src/app/main-features/login/store/effects/login-effects';
import { SessionState } from '../../main-features/login/store/state/session.state';
import { sessionReducer } from '../../main-features/login/store/reducers/session.reducer';
import { loginSelectKey } from '../../main-features/login/store/selectors/login.selectors';
import { sessionSelectKey } from '../../main-features/login/store/selectors/session.selectors';
import { ListUserEffects } from '../../main-features/private/user-managment/store/effects/list-user-effect.effects';
import { listUsersSelectKey } from '../../main-features/private/user-managment/store/selectors/list-user.selectors';
import { userReducer } from '../../main-features/private/user-managment/store/reducers/user.reducer';
import { UserState } from '../../main-features/private/user-managment/store/state/user.state';
import { homeSelectKey } from '../../main-features/private/home-managment/store/selectors/home.selectors';
import { HomeState } from '../../main-features/private/home-managment/store/state/init.state';
import { homeReducer } from '../../main-features/private/home-managment/store/reducers/home.reducer';
import { HomeEffects } from '../../main-features/private/home-managment/store/effects/home.effects';
import { isDevMode } from '@angular/core';

export interface AppStates {
    [loginSelectKey]: LoginState;
    [sessionSelectKey]: SessionState;
    [listUsersSelectKey]: UserState;
    [homeSelectKey]: HomeState;
}

export const appReducers: ActionReducerMap<AppStates> = {
    [loginSelectKey]: loginReducer,
    [sessionSelectKey]: sessionReducer,
    [listUsersSelectKey]: userReducer,
    [homeSelectKey]: homeReducer,
};

export const appEffects = [LoginEffects, ListUserEffects, HomeEffects];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppStates>[] = isDevMode() ? [debug] : [];
