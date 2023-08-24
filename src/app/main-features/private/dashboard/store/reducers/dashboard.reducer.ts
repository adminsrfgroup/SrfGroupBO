import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';
import { logReducer } from './log.reducer';

export const dashboardReducer: ActionReducer<IDashboardState, Action> = combineReducers({
    log: logReducer,
});
