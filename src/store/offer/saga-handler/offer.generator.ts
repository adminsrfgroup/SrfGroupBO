import { put } from "redux-saga/effects";
import {
  fetchAllOffersFailure,
  fetchAllOffersSuccess,
  fetchDetailsPublicOfferFailure,
  fetchDetailsPublicOfferSuccess
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/offer";

export function* fetchAllOffersHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAllOffersSuccess(result?.data));
  } catch (e) {
    yield put(fetchAllOffersFailure(e));
  }
}

export function* fetchDetailsPublicOfferHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public/${data.payload?.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchDetailsPublicOfferSuccess(result?.data));
  } catch (e) {
    yield put(fetchDetailsPublicOfferFailure(e));
  }
}
