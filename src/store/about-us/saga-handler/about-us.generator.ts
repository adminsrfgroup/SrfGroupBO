import { put } from "redux-saga/effects";
import {
  fetchAboutUsSuccess,
  fetchAboutUsFailure,
  addAboutUsSuccess,
  addAboutUsFailure
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/aboutus";

export function* fetchAboutUsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAboutUsSuccess(result?.data));
  } catch (e) {
    yield put(fetchAboutUsFailure(e));
  }
}

export function* addAboutUsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addAboutUsSuccess(result?.data));
  } catch (e) {
    yield put(addAboutUsFailure(e));
  }
}
