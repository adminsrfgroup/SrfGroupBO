import { all, takeEvery } from "redux-saga/effects";
import { fetchDeclarationProblem } from "./slice";
import { fetchDeclarationProblemHandler } from "./saga-handler/declaration-problem.generator";

export function* declarationProblemSaga() {
  yield all([
    takeEvery(fetchDeclarationProblem, fetchDeclarationProblemHandler)
  ]);
}

export default declarationProblemSaga;
