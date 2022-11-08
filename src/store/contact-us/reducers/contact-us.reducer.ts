import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchContactUs: (state: any) => {
    state.contactUs.loadingEntities = true;
  },
  fetchContactUsSuccess: (state: any, action: any) => {
    state.contactUs.loadingEntities = false;
    state.contactUs.entities = action.payload?.content;
    state.contactUs.totalItems = action.payload?.totalElements;
    state.contactUs.totalPages = action.payload?.totalPages;
  },
  fetchContactUsFailure: (state: any, action: PayloadAction) => {
    state.contactUs.loadingEntities = false;
    state.contactUs.errorMessage = action.payload;
  },

  resetContactUs: (state: any) => {
    state.contactUs = initialState.contactUs;
  }
};

export default reducer;
