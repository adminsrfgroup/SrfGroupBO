import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import {
  fetchCguFailure,
  fetchCguSuccess,
  updateCguFailure,
  updateCguSuccess
} from "../slice";

const apiUrl = "api/cgu";

export function* fetchCguHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchCguSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchCguFailure(e));
  }
}

export function* addCguHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(fetchCguSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchCguFailure(e));
  }
}

export function* updateCguHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/update/${data.payload?.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      { ...data.payload }
    );
    yield put(updateCguSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateCguFailure(e));
  }
}
