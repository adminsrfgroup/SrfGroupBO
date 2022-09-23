import { all, fork } from "redux-saga/effects";
import userSaga from "./user/saga";
import addressSaga from "./address/saga";
import categorySaga from "./category/saga";
import topSlidesSaga from "./home/saga";
import contactUsSaga from "./contact-us/saga";
import faqSaga from "./faq/saga";
import newsLetterSaga from "./news-letter/saga";
import declarationProblemSaga from "./declaration/saga";
import aboutUsSaga from "./about-us/saga";
import offerSaga from "./offer/saga";
import metricsSaga from "@store/dashboard/saga";

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(categorySaga),
    fork(addressSaga),
    fork(topSlidesSaga),
    fork(contactUsSaga),
    fork(faqSaga),
    fork(newsLetterSaga),
    fork(declarationProblemSaga),
    fork(aboutUsSaga),
    fork(offerSaga),
    fork(metricsSaga)
  ]);
}
