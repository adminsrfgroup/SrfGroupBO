import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchFaq: (state: any) => {
    state.faq.loadingEntities = true;
  },
  fetchFaqSuccess: (state: any, action: any) => {
    state.faq.loadingEntities = false;
    state.faq.entities = action.payload?.content;
    state.faq.totalItems = action.payload?.totalElements;
    state.faq.totalPages = action.payload?.totalPages;
  },
  fetchFaqFailure: (state: any, action: PayloadAction) => {
    state.faq.loadingEntities = false;
    state.faq.errorMessage = action.payload;
  },

  addFaq: (state: any) => {
    state.faq.loading = true;
    state.faq.addSuccess = false;
  },
  addFaqSuccess: (state: any, action: any) => {
    state.faq.loading = false;
    state.faq.entity = action.payload;
    state.faq.addSuccess = true;
  },
  addFaqFailure: (state: any) => {
    state.faq.loading = false;
  },

  resetFaq: (state: any) => {
    state.faq = initialState.faq;
  }
};

export default reducer;
