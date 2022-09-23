import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  addTopSlides: (state: any) => {
    state.topSlides.loading = true;
    state.topSlides.addSuccess = false;
  },
  addTopSlidesSuccess: (state: any) => {
    state.topSlides.loading = false;
    state.topSlides.addSuccess = true;
  },
  addTopSlidesFailure: (state: any, action: PayloadAction) => {
    state.topSlides.loading = false;
    state.topSlides.errorMessage = action.payload;
  },

  fetchTopSlides: (state: any) => {
    state.topSlides.loadingEntities = true;
  },
  fetchTopSlidesSuccess: (state: any, action: any) => {
    state.topSlides.loadingEntities = false;
    state.topSlides.entities = action.payload?.content;
    state.topSlides.totalItems = action.payload?.totalElements;
    state.topSlides.totalPages = action.payload?.totalPages;
  },
  fetchTopSlidesFailure: (state: any, action: PayloadAction) => {
    state.topSlides.loadingEntities = false;
    state.topSlides.errorMessage = action.payload;
  },

  resetTopSlides: (state: any) => {
    state.topSlides = initialState.topSlides;
  }
};

export default reducer;
