import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  updateInfosAccount: (state: any) => {
    state.account.loadingUpdateInfos = true;
  },
  updateInfosAccountSuccess: (state: any, action: PayloadAction) => {
    state.account.loadingUpdateInfos = false;
    state.account.updateSuccessInfos = true;
    state.session.currentUser = action.payload;
  },
  updateInfosAccountFailure: (state: any) => {
    state.account.loadingUpdateInfos = false;
    state.account.updateSuccessInfos = false;
  },

  updatePasswordAccount: (state: any) => {
    state.account.loadingPassword = true;
    state.account.updateSuccessPassword = false;
  },
  updatePasswordAccountSuccess: (state: any) => {
    state.account.loadingPassword = false;
    state.account.updateSuccessPassword = true;
  },
  updatePasswordAccountFailure: (state: any) => {
    state.account.loadingPassword = false;
    state.account.updateSuccessPassword = false;
  },

  updateAvatarAccount: (state: any) => {
    state.account.loadingUpdateAvatar = true;
    state.account.updateSuccessAvatar = false;
  },
  updateAvatarSuccess: (state: any, action: PayloadAction) => {
    state.account.loadingUpdateAvatar = false;
    state.account.updateSuccessAvatar = true;
    state.account.entityUpdateAvatar = action.payload;
    state.session.currentUser = action.payload;
  },
  updateAvatarFailure: (state: any) => {
    state.account.loadingUpdateAvatar = false;
    state.account.updateSuccessAvatar = false;
  }
};

export default reducer;
