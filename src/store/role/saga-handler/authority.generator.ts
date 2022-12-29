import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import {
  addAuthorityFailure,
  addAuthoritySuccess,
  fetchAuthoritiesFailure,
  fetchAuthoritiesSuccess,
  fetchAuthorityFailure,
  fetchAuthoritySuccess,
  updateAuthorityFailure,
  updateAuthoritySuccess,
  updateUserAuthorityFailure,
  updateUserAuthoritySuccess
} from "../slice";

const apiUrl = "api/authority";

export function* fetchAuthoritiesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAuthoritiesSuccess(result?.data));
  } catch (e) {
    yield put(fetchAuthoritiesFailure(e));
  }
}

export function* addAuthorityHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addAuthoritySuccess(result?.data));
  } catch (e) {
    yield put(addAuthorityFailure(e));
  }
}

export function* fetchAuthorityHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAuthoritySuccess(result?.data));
  } catch (e) {
    yield put(fetchAuthorityFailure(e));
  }
}

export function* updateAuthorityHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      { ...data.payload }
    );
    yield put(updateAuthoritySuccess(result?.data));
  } catch (e) {
    yield put(updateAuthorityFailure(e));
  }
}

export function* updateUserAuthorityHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/user-authority/${data.payload.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      { ...data.payload }
    );
    yield put(updateUserAuthoritySuccess(result?.data));
  } catch (e) {
    yield put(updateUserAuthorityFailure(e));
  }
}
