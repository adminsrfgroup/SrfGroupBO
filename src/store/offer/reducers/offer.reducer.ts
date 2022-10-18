import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchAllOffers: (state: any) => {
    state.offers.loadingEntities = true;
  },
  fetchAllOffersSuccess: (state: any, action: any) => {
    state.offers.loadingEntities = false;
    state.offers.entities = [
      ...state.offers.entities,
      ...action.payload.content
    ];
    state.offers.totalItems = action.payload?.totalElements;
    state.offers.totalPages = action.payload?.totalPages;
  },
  fetchAllOffersFailure: (state: any) => {
    state.offers.loadingEntities = false;
  },
  resetAllOffers: (state: any) => {
    state.offers = initialState.offers;
  },

  fetchDescriptionNewOffer: (state: any) => {
    state.descriptionNewOffer.loadingEntities = true;
  },
  fetchDescriptionNewOfferSuccess: (state: any, action: any) => {
    state.descriptionNewOffer.loadingEntities = false;
    state.descriptionNewOffer.entities = action.payload?.content;
    state.descriptionNewOffer.totalItems = action.payload?.totalElements;
    state.descriptionNewOffer.totalPages = action.payload?.totalPages;
  },
  fetchDescriptionNewOfferFailure: (state: any, action: PayloadAction) => {
    state.descriptionNewOffer.loadingEntities = false;
    state.descriptionNewOffer.errorMessage = action.payload;
  },

  addDescriptionNewOffer: (state: any) => {
    state.descriptionNewOffer.loading = true;
    state.descriptionNewOffer.addSuccess = false;
  },
  addDescriptionNewOfferSuccess: (state: any, action: any) => {
    state.descriptionNewOffer.loading = false;
    state.descriptionNewOffer.entity = action.payload;
    state.descriptionNewOffer.addSuccess = true;
  },
  addDescriptionNewOfferFailure: (state: any) => {
    state.descriptionNewOffer.loading = false;
  },

  fetchDescriptionByIdNewOffer: (state: any) => {
    state.descriptionNewOffer.loading = true;
  },
  fetchDescriptionByIdNewOfferSuccess: (state: any, action: any) => {
    state.descriptionNewOffer.loading = false;
    state.descriptionNewOffer.entity = action.payload;
  },
  fetchDescriptionByIdNewOfferFailure: (state: any, action: PayloadAction) => {
    state.descriptionNewOffer.loading = false;
    state.descriptionNewOffer.errorMessage = action.payload;
  },

  updateDescriptionNewOffer: (state: any) => {
    state.descriptionNewOffer.loading = true;
    state.descriptionNewOffer.updateSuccess = false;
  },
  updateDescriptionNewOfferSuccess: (state: any) => {
    state.descriptionNewOffer.loading = false;
    state.descriptionNewOffer.updateSuccess = true;
  },
  updateDescriptionNewOfferFailure: (state: any) => {
    state.descriptionNewOffer.loading = false;
  },

  resetDescriptionNewOffer: (state: any) => {
    state.descriptionNewOffer = initialState.descriptionNewOffer;
  }
};

export default reducer;
