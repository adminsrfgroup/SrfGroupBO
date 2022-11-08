import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "@store/dashboard/initial.state";
import metricsReducer from "./reducers/dashboard.reducer";

export const DASHBOARD_KEY_IN_STORE = "dashboard";

export const dashboardSlice: Slice = createSlice({
  name: DASHBOARD_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...metricsReducer
  }
});

export const {
  //? ********************| FETCH TOP METRICS ACTIONS |*******************/
  fetchMetrics,
  fetchMetricsSuccess,
  fetchMetricsFailure,
  resetMetrics,

  fetchLogs,
  fetchLogsSuccess,
  fetchLogsFailure,
  resetLogs,

  changeLogLevel,
  changeLogLevelSuccess,
  changeLogLevelFailure
} = dashboardSlice.actions;

//? ********************| METRICS SELECTORS |*******************/
export const loadingEntitiesMetrics = (state: any) =>
  state[DASHBOARD_KEY_IN_STORE].metrics.loadingEntities;
export const entitiesMetrics = (state: any) =>
  state[DASHBOARD_KEY_IN_STORE].metrics.entities;

//? ********************| LOGS SELECTORS |*******************/
export const loadingEntitiesLogs = (state: any) =>
  state[DASHBOARD_KEY_IN_STORE].logs.loadingEntities;
export const entitiesLogs = (state: any) =>
  state[DASHBOARD_KEY_IN_STORE].logs.entities;
