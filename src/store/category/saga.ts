import { all, takeEvery } from "redux-saga/effects";
import { fetchCategories, importCategories } from "./slice";
import {
  fetchCategoriesHandler,
  importCategoriesHandler
} from "./saga-handler/category.generator";

export function* categorySaga() {
  yield all([
    takeEvery(fetchCategories, fetchCategoriesHandler),
    takeEvery(importCategories, importCategoriesHandler)
  ]);
}

export default categorySaga;
