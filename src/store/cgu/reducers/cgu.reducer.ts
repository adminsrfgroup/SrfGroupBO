import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchCgu: (state: any) => {
    state.cgu.loading = true;
    state.cgu.updateSuccess = false;
    state.cgu.addSuccess = false;
  },
  fetchCguSuccess: (state: any, action: any) => {
    state.cgu.loading = false;
    state.cgu.entity = action.payload;
  },
  fetchCguFailure: (state: any, action: PayloadAction) => {
    state.cgu.loading = false;
    state.cgu.errorMessage = action.payload;
  },

  addCgu: (state: any) => {
    state.cgu.loading = true;
    state.cgu.addSuccess = false;
  },
  addCguSuccess: (state: any, action: any) => {
    state.cgu.loading = false;
    state.cgu.entity = action.payload?.content;
    state.cgu.addSuccess = true;
  },
  addCguFailure: (state: any, action: PayloadAction) => {
    state.cgu.loading = false;
    state.cgu.errorMessage = action.payload;
  },

  updateCgu: (state: any) => {
    state.cgu.loading = true;
    state.cgu.updateSuccess = false;
  },
  updateCguSuccess: (state: any, action: any) => {
    state.cgu.loading = false;
    state.cgu.entity = action.payload;
    state.cgu.updateSuccess = true;
  },
  updateCguFailure: (state: any, action: PayloadAction) => {
    state.cgu.loading = false;
    state.cgu.errorMessage = action.payload;
  }
};

export default reducer;
