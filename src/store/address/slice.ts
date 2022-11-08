import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import addressReducer from "./reducers/address.reducer";

export const ADDRESS_KEY_IN_STORE = "address";

export const addressSlice: Slice = createSlice({
  name: ADDRESS_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...addressReducer
  }
});

export const {
  //? ********************| FETCH ADDRESS ACTIONS |*******************/
  fetchAddress,
  fetchAddressSuccess,
  fetchAddressFailure,

  //? ********************| IMPORT ADDRESS ACTIONS |*******************/
  importAddress,
  importAddressSuccess,
  importAddressFailure,

  //? ********************| RESET ADDRESS ACTIONS |*******************/
  resetAddress
} = addressSlice.actions;

//? ********************| FETCH USERS SELECTORS |*******************/
export const loadingAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.loading;
export const entityAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.entity;
export const loadingEntitiesAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.loadingEntities;
export const entitiesAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.entities;
export const totalItemsAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.totalItems;
export const totalPagesAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.totalPages;
export const importSuccessAddress = (state: any) =>
  state[ADDRESS_KEY_IN_STORE].address.importSuccess;
