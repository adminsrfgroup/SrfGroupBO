import { ActionReducer, createReducer, on } from '@ngrx/store';
import { IMetricsState, initDashboardState } from '../state/dashboard.state';
import { loadListMetrics, loadMetricsFailure, loadMetricsSuccess } from '../actions/metrics.actions';

export const metricsReducer: ActionReducer<IMetricsState> = createReducer(
    initDashboardState.metrics,
    on(loadListMetrics, (state: IMetricsState) => {
        return {
            ...state,
            loadingEntities: true,
            totalElements: 0,
        };
    }),
    on(loadMetricsSuccess, (state: IMetricsState, action: ReturnType<typeof loadMetricsSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload,
            totalElements: action.payload.length,
        };
    }),
    on(loadMetricsFailure, (state: IMetricsState, action: ReturnType<typeof loadMetricsFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    })
);
