import { createSlice, Slice } from "@reduxjs/toolkit";
import advertisingReducer from "./reducers/advertissing.reducer";
import { initialState } from "@store/advertising/initial.state";

export const OFFER_KEY_IN_STORE = "advertising";

export const advertisingSlice: Slice = createSlice({
  name: OFFER_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...advertisingReducer
  }
});

export const {
  //? ********************| FETCH ALL ADVERTISING ACTIONS |*******************/
  fetchAdvertisings,
  fetchAdvertisingsSuccess,
  fetchAdvertisingsFailure,

  //? ********************| ADD ADVERTISING ACTIONS |*******************/
  addAdvertisingOffer,
  addAdvertisingOfferSuccess,
  addAdvertisingOfferFailure,

  //? ********************| REMOVE AVAILABLE ADVERTISING ACTIONS |*******************/
  removeAdvertisingOffer,
  removeAdvertisingOfferSuccess,
  removeAdvertisingOfferFailure,

  resetAdvertisings
} = advertisingSlice.actions;

//? ********************| ALL ADVERTISING SELECTORS |*******************/
export const loadingAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.loading;
export const entityAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.entity;
export const addSuccessAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.addSuccess;
export const loadingEntitiesAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.loadingEntities;
export const entitiesAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.entities;
export const deleteSuccessAdvertisingOffer = (state: any) =>
  state[OFFER_KEY_IN_STORE].advertisingOffer.deleteSuccess;
