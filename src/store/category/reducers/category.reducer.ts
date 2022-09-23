import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchCategories: (state: any) => {
    state.category.loadingEntities = true;
  },
  fetchCategoriesSuccess: (state: any, action: any) => {
    state.category.loadingEntities = false;
    state.category.entities = action.payload?.content;
    state.category.totalItems = action.payload?.totalElements;
    state.category.totalPages = action.payload?.totalPages;
  },
  fetchCategoriesFailure: (state: any, action: PayloadAction) => {
    state.category.loadingEntities = false;
    state.category.errorMessage = action.payload;
  },

  importCategories: (state: any) => {
    state.category.loadingImport = true;
    state.category.importSuccess = false;
  },
  importCategoriesSuccess: (state: any) => {
    state.category.loadingImport = false;
    state.category.importSuccess = true;
  },
  importCategoriesFailure: (state: any) => {
    state.category.loadingImport = false;
  },

  resetCategories: (state: any) => {
    state.category = initialState.category;
  }
};

export default reducer;
