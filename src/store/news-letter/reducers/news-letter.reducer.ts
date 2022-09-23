import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchNewsLetter: (state: any) => {
    state.newsLetter.loadingEntities = true;
  },
  fetchNewsLetterSuccess: (state: any, action: any) => {
    state.newsLetter.loadingEntities = false;
    state.newsLetter.entities = action.payload?.content;
    state.newsLetter.totalItems = action.payload?.totalElements;
    state.newsLetter.totalPages = action.payload?.totalPages;
  },
  fetchNewsLetterFailure: (state: any, action: PayloadAction) => {
    state.newsLetter.loadingEntities = false;
    state.newsLetter.errorMessage = action.payload;
  },

  resetNewsLetter: (state: any) => {
    state.newsLetter = initialState.newsLetter;
  }
};

export default reducer;
