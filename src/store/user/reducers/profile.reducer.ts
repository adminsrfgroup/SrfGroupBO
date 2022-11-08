import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchProfileUser: (state: any) => {
    state.profile.loading = true;
  },
  fetchProfileUserSuccess: (state: any, action: PayloadAction) => {
    state.profile.loading = false;
    state.profile.entity = action.payload;
  },
  fetchProfileUserFailure: (state: any) => {
    state.profile.loading = false;
  }
};

export default reducer;
