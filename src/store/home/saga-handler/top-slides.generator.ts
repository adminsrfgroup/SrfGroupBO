import { put } from "redux-saga/effects";
import {
  addTopSlidesSuccess,
  addTopSlidesFailure,
  fetchTopSlidesSuccess,
  fetchTopSlidesFailure,
  fetchTopSlidesByIdSuccess,
  fetchTopSlidesByIdFailure,
  updateTopSlidesSuccess,
  updateTopSlidesFailure,
  deleteTopSlidesSuccess,
  deleteTopSlidesFailure
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/top-home-slides-images";

/**
 *
 * @param data
 */
export function* addTopSlidesHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}/admin/create`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addTopSlidesSuccess(result?.data));
  } catch (e) {
    yield put(addTopSlidesFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* fetchTopSlidesHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/slides`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchTopSlidesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchTopSlidesFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* fetchTopSlidesByIdHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchTopSlidesByIdSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchTopSlidesByIdFailure(e));
  }
}

export function* updateTopSlidesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/update/${data.payload.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      { ...data.payload }
    );
    yield put(updateTopSlidesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateTopSlidesFailure(e));
  }
}

export function* deleteTopSlidesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.delete
    });
    yield put(deleteTopSlidesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(deleteTopSlidesFailure(e));
  }
}
