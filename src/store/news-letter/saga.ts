import { all, takeEvery } from "redux-saga/effects";
import { fetchNewsLetter } from "./slice";
import { fetchNewsLetterHandler } from "./saga-handler/news-letter.generator";

export function* newsLetterSaga() {
  yield all([takeEvery(fetchNewsLetter, fetchNewsLetterHandler)]);
}

export default newsLetterSaga;
