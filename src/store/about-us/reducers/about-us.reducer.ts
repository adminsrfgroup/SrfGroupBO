import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";
import { CommonPayload } from "../../root-reducer";

const reducer = {
  fetchAboutUs: (state: Draft<typeof initialState>) => {
    state.aboutUs.loadingEntities = true;
  },
  fetchAboutUsSuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.aboutUs.loadingEntities = false;
    state.aboutUs.entities = action.payload?.content;
    state.aboutUs.totalItems = action.payload?.totalElements;
    state.aboutUs.totalPages = action.payload?.totalPages;
  },
  fetchAboutUsFailure: (state: any, action: PayloadAction) => {
    state.aboutUs.loadingEntities = false;
    state.aboutUs.errorMessage = action.payload;
  },

  addAboutUs: (state: any) => {
    state.aboutUs.loading = true;
    state.aboutUs.addSuccess = false;
  },
  addAboutUsSuccess: (state: any) => {
    state.aboutUs.loading = false;
    state.aboutUs.addSuccess = true;
  },
  addAboutUsFailure: (state: any) => {
    state.aboutUs.loading = false;
  },

  resetAboutUs: (state: any) => {
    state.aboutUs = initialState.aboutUs;
  }
};

export default reducer;
