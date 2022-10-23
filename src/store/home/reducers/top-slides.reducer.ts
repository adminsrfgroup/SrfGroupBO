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

  fetchTopSlidesById: (state: any) => {
    state.topSlides.loading = true;
  },
  fetchTopSlidesByIdSuccess: (state: any, action: any) => {
    state.topSlides.loading = false;
    state.topSlides.entity = action.payload;
  },
  fetchTopSlidesByIdFailure: (state: any, action: PayloadAction) => {
    state.topSlides.loading = false;
    state.topSlides.errorMessage = action.payload;
  },

  updateTopSlides: (state: any) => {
    state.topSlides.loading = true;
    state.topSlides.updateSuccess = false;
  },
  updateTopSlidesSuccess: (state: any) => {
    state.topSlides.loading = false;
    state.topSlides.updateSuccess = true;
  },
  updateTopSlidesFailure: (state: any, action: PayloadAction) => {
    state.topSlides.loading = false;
    state.topSlides.errorMessage = action.payload;
  },

  deleteTopSlides: (state: any) => {
    state.topSlides.loading = true;
    state.topSlides.deleteSuccess = false;
  },
  deleteTopSlidesSuccess: (state: any) => {
    state.topSlides.loading = false;
    state.topSlides.deleteSuccess = true;
  },
  deleteTopSlidesFailure: (state: any, action: PayloadAction) => {
    state.topSlides.loading = false;
    state.topSlides.errorMessage = action.payload;
  },

  resetTopSlides: (state: any) => {
    state.topSlides = initialState.topSlides;
  }
};

export default reducer;
