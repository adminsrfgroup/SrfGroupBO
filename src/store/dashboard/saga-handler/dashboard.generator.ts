import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import { fetchMetricsSuccess, fetchMetricsFailure } from "../slice";

const apiUrl = "api/monitoring";

/**
 *
 * @param data
 */
export function* fetchMetricsHandler(): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/admin/metrics`,
        method: MethodHttp.get
      },
      {}
    );
    yield put(fetchMetricsSuccess(result?.data));
  } catch (e) {
    yield put(fetchMetricsFailure(e));
  }
}
