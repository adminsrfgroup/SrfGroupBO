import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchOrganigramme: (state: any) => {
    state.organigramme.loading = true;
  },
  fetchOrganigrammeSuccess: (state: any, action: PayloadAction) => {
    state.organigramme.loading = false;
    state.organigramme.entity = action.payload;
  },
  fetchOrganigrammeFailure: (state: any) => {
    state.organigramme.loading = false;
    state.organigramme.entity = null;
  },

  addOrganigramme: (state: any) => {
    state.organigramme.loading = true;
  },
  addOrganigrammeSuccess: (state: any, action: PayloadAction) => {
    state.organigramme.loading = false;
    state.organigramme.entity = action.payload;
  },
  addOrganigrammeFailure: (state: any) => {
    state.organigramme.loading = false;
  }
};
export default reducer;
