import { Action, ActionReducer, combineReducers } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';
import { logReducer } from './log.reducer';
import { metricsReducer } from './metrics.reducer';
import {organigrammeReducer} from "./organigramme.reducer";

export const dashboardReducer: ActionReducer<IDashboardState, Action> = combineReducers({
    metrics: metricsReducer,
    log: logReducer,
    organigramme: organigrammeReducer,
});
