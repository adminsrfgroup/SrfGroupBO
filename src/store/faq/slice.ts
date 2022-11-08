import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import faqReducer from "./reducers/faq.reducer";

export const FAQ_KEY_IN_STORE = "faq";

export const faqSlice: Slice = createSlice({
  name: FAQ_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...faqReducer
  }
});

export const {
  //? ********************| FETCH FAQ ACTIONS |*******************/
  fetchFaq,
  fetchFaqSuccess,
  fetchFaqFailure,

  //? ********************| ADD FAQ ACTIONS |*******************/
  addFaq,
  addFaqSuccess,
  addFaqFailure,

  //? ********************| RESET FAQ ACTIONS |*******************/
  resetFaq
} = faqSlice.actions;

//? ********************| FETCH USERS SELECTORS |*******************/
export const loadingFaq = (state: any) => state[FAQ_KEY_IN_STORE].faq.loading;
export const entityFaq = (state: any) => state[FAQ_KEY_IN_STORE].faq.entity;
export const loadingEntitiesFaq = (state: any) =>
  state[FAQ_KEY_IN_STORE].faq.loadingEntities;
export const entitiesFaq = (state: any) => state[FAQ_KEY_IN_STORE].faq.entities;
export const totalItemsFaq = (state: any) =>
  state[FAQ_KEY_IN_STORE].faq.totalItems;
export const totalPagesFaq = (state: any) =>
  state[FAQ_KEY_IN_STORE].faq.totalPages;
export const addSuccessFaq = (state: any) =>
  state[FAQ_KEY_IN_STORE].faq.addSuccess;
