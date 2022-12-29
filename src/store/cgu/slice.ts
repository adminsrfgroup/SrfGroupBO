import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "@store/cgu/initial.state";
import cguReducer from "@store/cgu/reducers/cgu.reducer";

export const CGU_KEY_IN_STORE = "cgu";

export const cguSlice: Slice = createSlice({
  name: CGU_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...cguReducer
  }
});

export const {
  //? ********************| FETCH CGU ACTIONS |*******************/
  fetchCgu,
  fetchCguSuccess,
  fetchCguFailure,

  //? ********************| ADD CGU ACTIONS |*******************/
  addCgu,
  addCguSuccess,
  addCguFailure,

  //? ********************| UPDATE CGU ACTIONS |*******************/
  updateCgu,
  updateCguSuccess,
  updateCguFailure
} = cguSlice.actions;

//? ********************| FETCH CGU SELECTORS |*******************/
export const loadingCgu = (state: any) => state[CGU_KEY_IN_STORE].cgu.loading;
export const entityCgu = (state: any) => state[CGU_KEY_IN_STORE].cgu.entity;
export const addSuccessCgu = (state: any) =>
  state[CGU_KEY_IN_STORE].cgu.addSuccess;
export const updateSuccessCgu = (state: any) =>
  state[CGU_KEY_IN_STORE].cgu.updateSuccess;
