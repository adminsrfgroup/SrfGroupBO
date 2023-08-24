import { ActionReducer, createReducer, on } from '@ngrx/store';
import { ILogState, initDashboardState } from '../state/dashboard.state';
import { loadListLog, loadListLogFailure, loadListLogSuccess } from '../actions/log.actions';

export const logReducer: ActionReducer<ILogState> = createReducer(
    initDashboardState.log,
    on(loadListLog, (state: ILogState) => {
        return {
            ...state,
            loadingEntities: true,
        };
    }),
    on(loadListLogSuccess, (state: ILogState, action: ReturnType<typeof loadListLogSuccess>) => {
        return {
            ...state,
            loadingEntities: false,
            entities: action.payload,
        };
    }),
    on(loadListLogFailure, (state: ILogState, action: ReturnType<typeof loadListLogFailure>) => {
        return {
            ...state,
            loadingEntities: false,
            errorMessage: action.error,
        };
    })
);
