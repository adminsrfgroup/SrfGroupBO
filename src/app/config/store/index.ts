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
import { userSelectKey } from '../../main-features/private/user-managment/store/selectors/user.selectors';
import { offerSelectKey } from '../../main-features/private/offer-managment/store/selectors/offer.selectors';
import { OfferState } from '../../main-features/private/offer-managment/store/state/offer.state';
import { offerReducer } from '../../main-features/private/offer-managment/store/reducers/offer.reducer';
import { OfferEffects } from '../../main-features/private/offer-managment/store/effects/offer.effects';
import { supportSelectKey } from '../../main-features/private/support-management/store/selectors/support.selectors';
import { SupportState } from '../../main-features/private/support-management/store/state/support.state';
import { supportReducer } from '../../main-features/private/support-management/store/reducers/support.reducer';
import { SupportEffects } from '../../main-features/private/support-management/store/effects/support.effects';
import { addressSelectKey } from '../../main-features/private/address-managment/store/serlectors/address.selector';
import { AddressState } from '../../main-features/private/address-managment/store/state/init.state';
import { addressReducer } from '../../main-features/private/address-managment/store/reducers/address.reducer';
import { AddressEffects } from '../../main-features/private/address-managment/store/effects/address.effect';
import { categoryReducer } from '../../main-features/private/category-managment/store/reducers/category.reducer';
import { CategoryState } from '../../main-features/private/category-managment/store/state/init.state';
import { categorySelectKey } from '../../main-features/private/category-managment/store/selectors/category.selector';
import { CategoryEffects } from '../../main-features/private/category-managment/store/effects/category.effect';

export interface AppStates {
    [loginSelectKey]: LoginState;
    [sessionSelectKey]: SessionState;
    [listUsersSelectKey]: UserState;
    [homeSelectKey]: HomeState;
    [userSelectKey]: UserState;
    [offerSelectKey]: OfferState;

    [supportSelectKey]: SupportState;

    [addressSelectKey]: AddressState;
    [categorySelectKey]: CategoryState;
}

export const appReducers: ActionReducerMap<AppStates> = {
    [loginSelectKey]: loginReducer,
    [sessionSelectKey]: sessionReducer,
    [listUsersSelectKey]: userReducer,
    [homeSelectKey]: homeReducer,
    [userSelectKey]: userReducer,
    [offerSelectKey]: offerReducer,
    [supportSelectKey]: supportReducer,
    [addressSelectKey]: addressReducer,
    [categorySelectKey]: categoryReducer,
};

export const appEffects = [LoginEffects, ListUserEffects, HomeEffects, OfferEffects, SupportEffects, AddressEffects, CategoryEffects];

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<AppStates>[] = isDevMode() ? [debug] : [];
