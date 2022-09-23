import { PayloadAction } from "@reduxjs/toolkit";

const reducer = {
  fetchUsers: (state: any) => {
    state.user.loadingEntities = true;
  },
  fetchUsersSuccess: (state: any, action: any) => {
    state.user.loadingEntities = false;
    state.user.entities = action.payload?.content;
    state.user.totalItems = action.payload?.totalElements;
    state.user.totalPages = action.payload?.totalPages;
  },
  fetchUsersFailure: (state: any, action: PayloadAction) => {
    state.user.loadingEntities = false;
    state.user.errorMessage = action.payload;
  },

  blockedUnblockeUser: (state: any) => {
    state.user.loadingBlockedUnblocked = true;
    state.user.blockedUnblocked = false;
  },
  blockedUnblockeUserSuccess: (state: any) => {
    state.user.loadingBlockedUnblocked = false;
    state.user.blockedUnblocked = true;
  },
  blockedUnblockeUserFailure: (state: any) => {
    state.user.loadingBlockedUnblocked = false;
  },

  addRemoveAdmin: (state: any) => {
    state.user.loadingAddRemoveAdmin = true;
    state.user.addRemoveAdmin = false;
  },
  addRemoveAdminSuccess: (state: any) => {
    state.user.loadingAddRemoveAdmin = false;
    state.user.addRemoveAdmin = true;
  },
  addRemoveAdminFailure: (state: any) => {
    state.user.loadingAddRemoveAdmin = false;
  }
};

export default reducer;
