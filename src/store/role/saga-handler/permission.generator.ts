import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import {
  addPermissionFailure,
  addPermissionSuccess,
  fetchPermissionFailure,
  fetchPermissionsFailure,
  fetchPermissionsSuccess,
  fetchPermissionSuccess,
  updatePermissionFailure,
  updatePermissionSuccess
} from "../slice";

const apiUrl = "api/permission";

export function* addPermissionHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data.payload }
    );
    yield put(addPermissionSuccess(result?.data));
  } catch (e) {
    yield put(addPermissionFailure(e));
  }
}

export function* fetchPermissionsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchPermissionsSuccess(result?.data));
  } catch (e) {
    yield put(fetchPermissionsFailure(e));
  }
}

export function* fetchPermissionHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload?.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchPermissionSuccess(result?.data));
  } catch (e) {
    yield put(fetchPermissionFailure(e));
  }
}

export function* updatePermissionHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload?.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      { ...data?.payload }
    );
    yield put(updatePermissionSuccess(result?.data));
  } catch (e) {
    yield put(updatePermissionFailure(e));
  }
}
