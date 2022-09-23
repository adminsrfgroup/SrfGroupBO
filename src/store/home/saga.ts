import { all, takeEvery } from "redux-saga/effects";
import {
  addTopSlides,
  fetchTopSlides,
  fetchFeatureHome,
  addFeatureHome
} from "./slice";
import {
  addTopSlidesHandler,
  fetchTopSlidesHandler
} from "./saga-handler/top-slides.generator";
import {
  addFeatureHomeHandler,
  fetchFeatureHomeHandler
} from "./saga-handler/featrue-home.generator";

export function* topSlidesSaga() {
  yield all([
    takeEvery(addTopSlides, addTopSlidesHandler),
    takeEvery(fetchTopSlides, fetchTopSlidesHandler),
    takeEvery(fetchFeatureHome, fetchFeatureHomeHandler),
    takeEvery(addFeatureHome, addFeatureHomeHandler)
  ]);
}

export default topSlidesSaga;
