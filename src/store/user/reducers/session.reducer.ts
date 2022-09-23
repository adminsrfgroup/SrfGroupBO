import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  sessionUser: (state: any) => {
    state.session.loading = true;
    state.session.isAuthenticated = false;
  },
  sessionUserSuccess: (state: any, action: PayloadAction) => {
    state.session.loading = false;
    state.session.isAuthenticated = true;
    state.session.currentUser = action.payload;
  },
  sessionUserFailure: (state: any) => {
    state.session.loading = false;
    state.session.isAuthenticated = false;
  },

  // Number of notifications
  getNumberOfNotificationsNotSee: (state: any) => {
    state.session.nbeNotificationsNotRead = 0;
  },
  getNumberOfNotificationsNotSeeSuccess: (
    state: any,
    action: PayloadAction
  ) => {
    state.session.nbeNotificationsNotRead = action.payload;
  },
  getNumberOfNotificationsNotSeeFailure: (state: any) => {
    state.session.nbeNotificationsNotRead = 0;
  },

  // Number of messages
  getNumberOfMessagesNotSee: (state: any) => {
    state.session.nbeMessagesNotRead = 0;
  },
  getNumberOfMessagesNotSeeSuccess: (state: any, action: PayloadAction) => {
    state.session.nbeMessagesNotRead = action.payload;
  },
  getNumberOfMessagesNotSeeFailure: (state: any) => {
    state.session.nbeMessagesNotRead = 0;
  },

  // Logout
  logout: (state: any) => {
    state.login = initialState.login;
    state.session = {
      isAuthenticated: false,
      token: "",
      currentUser: {},
      nbeNotificationsNotRead: 0,
      nbeMessagesNotRead: 0,
      oneSignalId: "",
      loading: false
    };
  }
};

export default reducer;
