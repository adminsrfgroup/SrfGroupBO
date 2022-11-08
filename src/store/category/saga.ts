import { all, takeEvery } from "redux-saga/effects";
import {
  fetchCategories,
  importCategories,
  addCategory,
  updateIndexCategory,
  fetchCategory,
  updateCategory
} from "./slice";
import {
  addCategoryHandler,
  fetchCategoriesHandler,
  fetchCategoryHandler,
  importCategoriesHandler,
  updateCategoryHandler,
  updateIndexCategoryHandler
} from "./saga-handler/category.generator";

export function* categorySaga() {
  yield all([
    takeEvery(fetchCategories, fetchCategoriesHandler),
    takeEvery(importCategories, importCategoriesHandler),
    takeEvery(addCategory, addCategoryHandler),
    takeEvery(updateIndexCategory, updateIndexCategoryHandler),
    takeEvery(fetchCategory, fetchCategoryHandler),
    takeEvery(updateCategory, updateCategoryHandler)
  ]);
}

export default categorySaga;
