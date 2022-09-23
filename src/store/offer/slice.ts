import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import offerReducer from "./reducers/offer.reducer";

export const OFFER_KEY_IN_STORE = "offer";

export const offerSlice: Slice = createSlice({
  name: OFFER_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...offerReducer
  }
});

export const {
  //? ********************| FETCH ALL OFFERS ACTIONS |*******************/
  fetchAllOffers,
  fetchAllOffersSuccess,
  fetchAllOffersFailure,
  resetAllOffers,

  //? ********************| FETCH DESCRIPTION NEW OFFER ACTIONS |*******************/
  fetchDescriptionNewOffer,
  fetchDescriptionNewOfferSuccess,
  fetchDescriptionNewOfferFailure,

  //? ********************| ADD DESCRIPTION NEW OFFER ACTIONS |*******************/
  addDescriptionNewOffer,
  addDescriptionNewOfferSuccess,
  addDescriptionNewOfferFailure,

  //? ********************| RESET DESCRIPTION NEW OFFER ACTIONS |*******************/
  resetDescriptionNewOffer
} = offerSlice.actions;

//? ********************| ALL OFFER SELECTORS |*******************/
// export const loadingOffer = (state: any) => state[OFFER_KEY_IN_STORE].offer.loading;
// export const entityOffer = (state: any) => state[OFFER_KEY_IN_STORE].offer.entity;
export const loadingEntitiesOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].offers.loadingEntities;
export const entitiesOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].offers.entities;
export const totalItemsOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].offers.totalItems;
export const totalPagesOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].offers.totalPages;

//? ********************| FETCH USERS SELECTORS |*******************/
export const loadingDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.loading;
export const entityDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.entity;
export const loadingEntitiesDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.loadingEntities;
export const entitiesDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.entities;
export const totalItemsDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.totalItems;
export const totalPagesDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.totalPages;
export const addSuccessDescriptionNewOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].descriptionNewOffer.addSuccess;
