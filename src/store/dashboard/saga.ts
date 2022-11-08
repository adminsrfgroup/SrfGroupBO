import { all, takeEvery } from "redux-saga/effects";
import { fetchMetrics, fetchLogs } from "./slice";
import { fetchMetricsHandler } from "@store/dashboard/saga-handler/dashboard.generator";
import { fetchLogsHandler } from "@store/dashboard/saga-handler/logs.generator";

export function* metricsSaga() {
  yield all([takeEvery(fetchMetrics, fetchMetricsHandler)]);
  yield all([takeEvery(fetchLogs, fetchLogsHandler)]);
}

export default metricsSaga;
