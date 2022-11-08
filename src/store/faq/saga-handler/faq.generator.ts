import { put } from "redux-saga/effects";
import {
  fetchFaqSuccess,
  fetchFaqFailure,
  addFaqFailure,
  addFaqSuccess
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/faq";

export function* fetchFaqHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchFaqSuccess(result?.data));
  } catch (e) {
    yield put(fetchFaqFailure(e));
  }
}

export function* addFaqHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/admin/create`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addFaqSuccess(result?.data));
  } catch (e) {
    yield put(addFaqFailure(e));
  }
}
