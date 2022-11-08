import { put } from "redux-saga/effects";
import { fetchContactUsSuccess, fetchContactUsFailure } from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/contactus";

export function* fetchContactUsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/list?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchContactUsSuccess(result?.data));
  } catch (e) {
    yield put(fetchContactUsFailure(e));
  }
}
