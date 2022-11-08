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

  addCategory: (state: any) => {
    state.category.loading = true;
    state.category.addSuccess = false;
  },
  addCategorySuccess: (state: any) => {
    state.category.loading = false;
    state.category.addSuccess = true;
  },
  addCategoryFailure: (state: any) => {
    state.category.loading = false;
  },

  updateIndexCategory: (state: any) => {
    state.category.loading = true;
    state.category.updateIndexSuccess = false;
  },
  updateIndexCategorySuccess: (state: any) => {
    state.category.loading = false;
    state.category.updateIndexSuccess = true;
  },
  updateIndexCategoryFailure: (state: any) => {
    state.category.loading = false;
  },

  fetchCategory: (state: any) => {
    state.category.loading = true;
  },
  fetchCategorySuccess: (state: any, action: PayloadAction) => {
    state.category.loading = false;
    state.category.entity = action.payload;
  },
  fetchCategoryFailure: (state: any) => {
    state.category.loading = false;
  },

  updateCategory: (state: any) => {
    state.category.loading = true;
    state.category.updateSuccess = false;
  },
  updateCategorySuccess: (state: any) => {
    state.category.loading = false;
    state.category.updateSuccess = true;
  },
  updateCategoryFailure: (state: any) => {
    state.category.loading = false;
  },

  resetCategories: (state: any) => {
    state.category = initialState.category;
  }
};

export default reducer;
