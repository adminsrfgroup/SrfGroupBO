import { all, takeEvery } from "redux-saga/effects";
import {
  fetchDescriptionNewOffer,
  addDescriptionNewOffer,
  fetchAllOffers,
  fetchDescriptionByIdNewOffer,
  updateDescriptionNewOffer
} from "./slice";
import {
  addDescriptionNewOfferHandler,
  fetchDescriptionByIdNewOfferHandler,
  fetchDescriptionNewOfferHandler,
  updateDescriptionNewOfferHandler
} from "./saga-handler/description-new-offer.generator";
import { fetchAllOffersHandler } from "@store/offer/saga-handler/offer.generator";

export function* offerSaga() {
  yield all([
    takeEvery(fetchAllOffers, fetchAllOffersHandler),
    takeEvery(fetchDescriptionNewOffer, fetchDescriptionNewOfferHandler),
    takeEvery(addDescriptionNewOffer, addDescriptionNewOfferHandler),
    takeEvery(
      fetchDescriptionByIdNewOffer,
      fetchDescriptionByIdNewOfferHandler
    ),
    takeEvery(updateDescriptionNewOffer, updateDescriptionNewOfferHandler)
  ]);
}

export default offerSaga;
