import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import categoryReducer from "./reducers/category.reducer";

export const CATEGORY_KEY_IN_STORE = "category";

export const categorySlice: Slice = createSlice({
  name: CATEGORY_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...categoryReducer
  }
});

export const {
  //? ********************| FETCH CATEGORIES ACTIONS |*******************/
  fetchCategories,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,

  //? ********************| IMPORT CATEGORIES ACTIONS |*******************/
  importCategories,
  importCategoriesSuccess,
  importCategoriesFailure,

  //? ********************| ADD CATEGORY ACTIONS |*******************/
  addCategory,
  addCategorySuccess,
  addCategoryFailure,

  //? ********************| UPDATE INDEX CATEGORIES ACTIONS |*******************/
  updateIndexCategory,
  updateIndexCategorySuccess,
  updateIndexCategoryFailure,

  //? ********************| FETCH CATEGORY ACTIONS |*******************/
  fetchCategory,
  fetchCategorySuccess,
  fetchCategoryFailure,

  //? ********************| UPDATE CATEGORY ACTIONS |*******************/
  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,

  //? ********************| RESET CATEGORIES ACTIONS |*******************/
  resetCategories
} = categorySlice.actions;

//? ********************| FETCH USERS SELECTORS |*******************/
export const loadingCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.loading;
export const entityCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.entity;
export const loadingEntitiesCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.loadingEntities;
export const entitiesCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.entities;
export const totalItemsCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.totalItems;
export const totalPagesCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.totalPages;
export const importSuccessCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.importSuccess;
export const addSuccessCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.addSuccess;
export const updateSuccessCategories = (state: any) =>
  state[CATEGORY_KEY_IN_STORE].category.updateSuccess;
