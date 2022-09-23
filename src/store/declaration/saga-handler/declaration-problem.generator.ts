import { put } from "redux-saga/effects";
import {
  fetchDeclarationProblemFailure,
  fetchDeclarationProblemSuccess
} from "../slice";
import { invokeWS, MethodHttp } from "../../../lib/api-service";

const apiUrl = "api/report-probleme";

export function* fetchDeclarationProblemHandler(
  data: any
): Generator<any, any, any> {
  try {
    const requestUrl = `${apiUrl}/admin?page=${data.payload?.page}&size=${data.payload?.size}${data.payload?.queryParams}`;
    const result = yield invokeWS({
      url: `${requestUrl}`,
      method: MethodHttp.get
    });
    yield put(fetchDeclarationProblemSuccess(result?.data));
  } catch (e) {
    yield put(fetchDeclarationProblemFailure(e));
  }
}
