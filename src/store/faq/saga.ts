import { all, takeEvery } from "redux-saga/effects";
import { fetchFaq, addFaq } from "./slice";
import { addFaqHandler, fetchFaqHandler } from "./saga-handler/faq.generator";

export function* faqSaga() {
  yield all([
    takeEvery(fetchFaq, fetchFaqHandler),
    takeEvery(addFaq, addFaqHandler)
  ]);
}

export default faqSaga;
