import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import contactUsReducer from "./reducers/contact-us.reducer";

export const CONTACT_US_KEY_IN_STORE = "contactUs";

export const contactUsSlice: Slice = createSlice({
  name: CONTACT_US_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...contactUsReducer
  }
});

export const {
  //? ********************| FETCH CONTACT US ACTIONS |*******************/
  fetchContactUs,
  fetchContactUsSuccess,
  fetchContactUsFailure,

  //? ********************| RESET CONTACT US ACTIONS |*******************/
  resetContactUs
} = contactUsSlice.actions;

//? ********************| FETCH USERS SELECTORS |*******************/
export const loadingContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.loading;
export const entityContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.entity;
export const loadingEntitiesContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.loadingEntities;
export const entitiesContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.entities;
export const totalItemsContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.totalItems;
export const totalPagesContactUs = (state: any) =>
  state[CONTACT_US_KEY_IN_STORE].contactUs.totalPages;
