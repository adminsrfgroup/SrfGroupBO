import {createFeatureSelector, createSelector} from "@ngrx/store";
import {OfferState} from "../state/offer.state";

export const offerSelectKey = 'offer';

export const selectOfferState = createFeatureSelector<OfferState>(offerSelectKey);

export const selectorOffers = createSelector(selectOfferState, (state: OfferState) => state);
