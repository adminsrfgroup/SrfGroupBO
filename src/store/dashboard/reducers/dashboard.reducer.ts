import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@store/dashboard/initial.state";

const reducer = {
  fetchMetrics: (state: any) => {
    state.metrics.loadingEntities = true;
  },
  fetchMetricsSuccess: (state: any, action: any) => {
    state.metrics.loadingEntities = false;
    state.metrics.entities = action.payload;
  },
  fetchMetricsFailure: (state: any, action: PayloadAction) => {
    state.metrics.loadingEntities = false;
    state.metrics.errorMessage = action.payload;
  },
  resetMetrics: (state: any) => {
    state.metrics = initialState.metrics;
  },

  fetchLogs: (state: any) => {
    state.logs.loadingEntities = true;
  },
  fetchLogsSuccess: (state: any, action: any) => {
    state.logs.loadingEntities = false;
    state.logs.entities = action.payload;
  },
  fetchLogsFailure: (state: any, action: PayloadAction) => {
    state.logs.loadingEntities = false;
    state.logs.errorMessage = action.payload;
  },
  resetLogs: (state: any) => {
    state.logs = initialState.logs;
  }
};
export default reducer;
