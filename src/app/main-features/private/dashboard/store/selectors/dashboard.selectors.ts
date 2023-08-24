import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDashboardState } from '../state/dashboard.state';

export const dashboardSelectKey = 'dashboard';

export const selectDashboardState = createFeatureSelector<IDashboardState>(dashboardSelectKey);

export const selectorLog = createSelector(selectDashboardState, (state: IDashboardState) => state.log);
