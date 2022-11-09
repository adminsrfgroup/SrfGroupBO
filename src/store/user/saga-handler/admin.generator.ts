import { invokeWS, MethodHttp } from "../../../lib/api-service";
import { put } from "redux-saga/effects";
import {
  addOrganigrammeFailure,
  addOrganigrammeSuccess,
  fetchOrganigrammeFailure,
  fetchOrganigrammeSuccess
} from "@store/user/slice";

const apiUrl = "api/administration/";

export function* fetchOrganigrammeHandler(): Generator<any, any, any> {
  try {
    const result = yield invokeWS({
      url: `${apiUrl}fetch-organigramme`,
      method: MethodHttp.get
    });
    yield put(fetchOrganigrammeSuccess(result.data));
  } catch (e) {
    yield put(fetchOrganigrammeFailure(e));
  }
}

export function* addOrganigrammeHandler(data: any): Generator<any, any, any> {
  try {
    const result = yield invokeWS(
      {
        url: `${apiUrl}create-organigramme`,
        method: MethodHttp.post
      },
      data?.payload
    );

    yield put(addOrganigrammeSuccess(result.data));
  } catch (e) {
    yield put(addOrganigrammeFailure(e));
  }
}
