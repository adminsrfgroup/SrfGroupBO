import { all, takeEvery } from "redux-saga/effects";
import {
  fetchAdvertisings,
  addAdvertisingOffer,
  removeAdvertisingOffer
} from "./slice";
import {
  addPubOfferHandler,
  fetchAdvertisingsHandler,
  removeAdvertisingOfferHandler
} from "@store/advertising/saga-handler/advertising.generator";

export function* advertisingSaga() {
  yield all([
    takeEvery(fetchAdvertisings, fetchAdvertisingsHandler),
    takeEvery(addAdvertisingOffer, addPubOfferHandler),
    takeEvery(removeAdvertisingOffer, removeAdvertisingOfferHandler)
  ]);
}
