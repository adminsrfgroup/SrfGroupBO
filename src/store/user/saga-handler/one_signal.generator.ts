import { put } from "redux-saga/effects";
import {
  fetchOneSignalsByUserFailure,
  fetchOneSignalsByUserSuccess
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/onesignal/";

export function* fetchOneSignalsByUserHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}for-user/${data.payload.id}`,
      method: MethodHttp.get
    });
    yield put(fetchOneSignalsByUserSuccess(result.data));
  } catch (e) {
    console.error(e);
    yield put(fetchOneSignalsByUserFailure(e));
  }
}
