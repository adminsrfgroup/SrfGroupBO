import { all, takeEvery } from "redux-saga/effects";
import { fetchAddress, importAddress } from "./slice";
import {
  fetchAddressHandler,
  importAddressHandler
} from "./saga-handler/address.generator";

export function* addressSaga() {
  yield all([
    takeEvery(fetchAddress, fetchAddressHandler),
    takeEvery(importAddress, importAddressHandler)
  ]);
}

export default addressSaga;
