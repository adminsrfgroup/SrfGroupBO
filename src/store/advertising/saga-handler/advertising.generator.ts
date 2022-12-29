import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import {
  addAdvertisingOfferFailure,
  addAdvertisingOfferSuccess,
  fetchAdvertisingsFailure,
  fetchAdvertisingsSuccess,
  removeAdvertisingOfferFailure,
  removeAdvertisingOfferSuccess
} from "../slice";

const apiUrl = "api/advertising-per-period";

export function* fetchAdvertisingsHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchAdvertisingsSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchAdvertisingsFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* addPubOfferHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data?.payload }
    );
    yield put(addAdvertisingOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addAdvertisingOfferFailure(e));
  }
}

/**
 *
 * @param data
 */
export function* removeAdvertisingOfferHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data?.payload?.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.put
    });
    yield put(removeAdvertisingOfferSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(removeAdvertisingOfferFailure(e));
  }
}
