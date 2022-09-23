import { put } from "redux-saga/effects";
import { fetchAllOffersFailure, fetchAllOffersSuccess } from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/offer";

export function* fetchAllOffersHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAllOffersFailure(result?.data));
  } catch (e) {
    yield put(fetchAllOffersSuccess(e));
  }
}
