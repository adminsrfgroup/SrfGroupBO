import { put } from "redux-saga/effects";
import {
  addCategoryFailure,
  addCategorySuccess,
  fetchCategoriesFailure,
  fetchCategoriesSuccess,
  fetchCategoryFailure,
  fetchCategorySuccess,
  importCategoriesFailure,
  importCategoriesSuccess,
  updateCategoryFailure,
  updateCategorySuccess
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/category";

export function* fetchCategoriesHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/public?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchCategoriesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchCategoriesFailure(e));
  }
}

export function* importCategoriesHandler(): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/import`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(importCategoriesSuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(importCategoriesFailure(e));
  }
}

export function* addCategoryHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/create`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.post
      },
      { ...data?.payload }
    );
    yield put(addCategorySuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addCategoryFailure(e));
  }
}

export function* updateIndexCategoryHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/update-index`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      data?.payload
    );
    yield put(addCategorySuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(addCategoryFailure(e));
  }
}

export function* fetchCategoryHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/${data.payload.id}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchCategorySuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(fetchCategoryFailure(e));
  }
}

export function* updateCategoryHandler(data: any): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin/update/${data.payload.id}`;
    const result = yield invokeWS(
      {
        url: `${requestUrl}`,
        method: MethodHttp.put
      },
      data?.payload
    );
    yield put(updateCategorySuccess(result?.data));
  } catch (e) {
    console.error(e);
    yield put(updateCategoryFailure(e));
  }
}
