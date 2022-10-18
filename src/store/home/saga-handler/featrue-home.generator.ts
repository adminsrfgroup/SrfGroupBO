import { put } from "redux-saga/effects";
import {
  fetchFeatureHomeSuccess,
  fetchFeatureHomeFailure,
  addFeatureHomeFailure,
  addFeatureHomeSuccess,
  fetchFeatureHomeByIdSuccess,
  fetchFeatureHomeByIdFailure,
  updateFeatureHomeSuccess,
  updateFeatureHomeFailure
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/post-home-feature";

/**
 *
 * @param data
 */
export function* fetchFeatureHomeHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/list`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchFeatureHomeSuccess(result?.data));
  } catch (e) {
    yield put(fetchFeatureHomeFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* addFeatureHomeHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/admin/create`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addFeatureHomeSuccess(result?.data));
  } catch (e) {
    yield put(addFeatureHomeFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* fetchFeatureHomeByIdHandler(
  data: any
): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}/admin/${data.payload.id}`,
      method: MethodHttp.get
    });
    yield put(fetchFeatureHomeByIdSuccess(result?.data));
  } catch (e) {
    yield put(fetchFeatureHomeByIdFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* updateFeatureHomeHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/admin/${data.payload.id}`,
        method: MethodHttp.put
      },
      { ...data.payload }
    );
    yield put(updateFeatureHomeSuccess(result?.data));
  } catch (e) {
    yield put(updateFeatureHomeFailure(e));
  }
}
