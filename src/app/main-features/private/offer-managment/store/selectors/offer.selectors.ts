import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMainOfferState } from '../state/offer.state';

export const offerSelectKey = 'offer';

export const selectOfferState = createFeatureSelector<IMainOfferState>(offerSelectKey);

export const selectorOffers = createSelector(selectOfferState, (state: IMainOfferState) => state.offers);
export const selectorDescriptionAddNewOffer = createSelector(selectOfferState, (state: IMainOfferState) => state.descriptionNewOffer);
