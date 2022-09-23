import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import aboutUsReducer from "./reducers/about-us.reducer";

export const ABOUT_US_KEY_IN_STORE = "aboutUs";

export const aboutUsSlice: Slice = createSlice({
  name: ABOUT_US_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...aboutUsReducer
  }
});

export const {
  //? ********************| FETCH ABOUT US ACTIONS |*******************/
  fetchAboutUs,
  fetchAboutUsSuccess,
  fetchAboutUsFailure,

  //? ********************| ADD ABOUT US ACTIONS |*******************/
  addAboutUs,
  addAboutUsSuccess,
  addAboutUsFailure,

  //? ********************| RESET ABOUT US ACTIONS |*******************/
  resetAboutUs
} = aboutUsSlice.actions;

//? ********************| FETCH ABOUT US SELECTORS |*******************/
export const loadingAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.loading;
export const entityAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.entity;
export const loadingEntitiesAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.loadingEntities;
export const entitiesAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.entities;
export const totalItemsAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.totalItems;
export const totalPagesAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.totalPages;
export const addSuccessAboutUs = (state: any) =>
  state[ABOUT_US_KEY_IN_STORE].aboutUs.addSuccess;
