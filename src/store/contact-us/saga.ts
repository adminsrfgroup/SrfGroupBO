import { all, takeEvery } from "redux-saga/effects";
import { fetchContactUs } from "./slice";
import { fetchContactUsHandler } from "./saga-handler/contact-us.generator";

export function* contactUsSaga() {
  yield all([takeEvery(fetchContactUs, fetchContactUsHandler)]);
}

export default contactUsSaga;
