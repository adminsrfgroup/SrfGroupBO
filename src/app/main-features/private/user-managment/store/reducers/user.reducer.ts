import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { UserState } from '../state/user.state';
import { listUserReducer } from './list-users.reducer';
import { detailsUserReducer } from './details-users.reducer';

export const userReducer: ActionReducer<UserState, Action> = combineReducers({
    listUsers: listUserReducer,
    detailsUsers: detailsUserReducer,
});
