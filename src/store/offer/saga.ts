import { all, takeEvery } from "redux-saga/effects";
import {
  fetchDescriptionNewOffer,
  addDescriptionNewOffer,
  fetchAllOffers
} from "./slice";
import {
  addDescriptionNewOfferHandler,
  fetchDescriptionNewOfferHandler
} from "./saga-handler/description-new-offer.generator";
import { fetchAllOffersHandler } from "@store/offer/saga-handler/offer.generator";

export function* offerSaga() {
  yield all([
    takeEvery(fetchAllOffers, fetchAllOffersHandler),
    takeEvery(fetchDescriptionNewOffer, fetchDescriptionNewOfferHandler),
    takeEvery(addDescriptionNewOffer, addDescriptionNewOfferHandler)
  ]);
}

export default offerSaga;
