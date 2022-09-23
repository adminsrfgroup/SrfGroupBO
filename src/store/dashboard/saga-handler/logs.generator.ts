import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import { fetchLogsFailure, fetchLogsSuccess } from "@store/dashboard/slice";

const apiUrl = "";

/**
 *
 */
export function* fetchLogsHandler(): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/actuator/loggers`,
        method: MethodHttp.get
      },
      {}
    );
    yield put(fetchLogsSuccess(result?.data));
  } catch (e) {
    yield put(fetchLogsFailure(e));
  }
}
