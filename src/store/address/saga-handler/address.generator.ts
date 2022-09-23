import { put } from "redux-saga/effects";
import {
  fetchAddressSuccess,
  fetchAddressFailure,
  importAddressSuccess,
  importAddressFailure
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/address";

export function* fetchAddressHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAddressSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchAddressFailure(e));
  }
}

export function* importAddressHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/import`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(importAddressSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(importAddressFailure(e));
  }
}
