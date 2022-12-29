import { all, takeEvery } from "redux-saga/effects";

import { fetchCgu, addCgu, updateCgu } from "./slice";
import {
  addCguHandler,
  fetchCguHandler,
  updateCguHandler
} from "./saga-handler/cgu.generator";

export function* cguSaga() {
  yield all([
    takeEvery(fetchCgu, fetchCguHandler),
    takeEvery(addCgu, addCguHandler),
    takeEvery(updateCgu, updateCguHandler)
  ]);
}

export default cguSaga;
