import { put } from "redux-saga/effects";
import {
  addTopSlidesSuccess,
  addTopSlidesFailure,
  fetchTopSlidesSuccess,
  fetchTopSlidesFailure
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
    const requestUrl = `${apiUrl}/public/slides`;
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
