import { all, takeEvery } from "redux-saga/effects";
import { addAboutUs, fetchAboutUs } from "./slice";
import {
  addAboutUsHandler,
  fetchAboutUsHandler
} from "./saga-handler/about-us.generator";

export function* aboutUsSaga() {
  yield all([
    takeEvery(fetchAboutUs, fetchAboutUsHandler),
    takeEvery(addAboutUs, addAboutUsHandler)
  ]);
}

export default aboutUsSaga;
