import { all, takeEvery } from "redux-saga/effects";
import {
  addTopSlides,
  fetchTopSlides,
  updateTopSlides,
  fetchTopSlidesById,
  fetchFeatureHome,
  addFeatureHome,
  fetchFeatureHomeById,
  updateFeatureHome
} from "./slice";
import {
  addTopSlidesHandler,
  fetchTopSlidesByIdHandler,
  fetchTopSlidesHandler,
  updateTopSlidesHandler
} from "./saga-handler/top-slides.generator";
import {
  addFeatureHomeHandler,
  fetchFeatureHomeByIdHandler,
  fetchFeatureHomeHandler,
  updateFeatureHomeHandler
} from "./saga-handler/featrue-home.generator";

export function* topSlidesSaga() {
  yield all([
    takeEvery(addTopSlides, addTopSlidesHandler),
    takeEvery(fetchTopSlides, fetchTopSlidesHandler),
    takeEvery(updateTopSlides, updateTopSlidesHandler),
    takeEvery(fetchTopSlidesById, fetchTopSlidesByIdHandler),
    takeEvery(fetchFeatureHome, fetchFeatureHomeHandler),
    takeEvery(addFeatureHome, addFeatureHomeHandler),
    takeEvery(fetchFeatureHomeById, fetchFeatureHomeByIdHandler),
    takeEvery(updateFeatureHome, updateFeatureHomeHandler)
  ]);
}

export default topSlidesSaga;
