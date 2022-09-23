import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../initial.state";

const reducer = {
  fetchDeclarationProblem: (state: any) => {
    state.declarationProblem.loadingEntities = true;
  },
  fetchDeclarationProblemSuccess: (state: any, action: any) => {
    state.declarationProblem.loadingEntities = false;
    state.declarationProblem.entities = action.payload?.content;
    state.declarationProblem.totalItems = action.payload?.totalElements;
    state.declarationProblem.totalPages = action.payload?.totalPages;
  },
  fetchDeclarationProblemFailure: (state: any, action: PayloadAction) => {
    state.declarationProblem.loadingEntities = false;
    state.declarationProblem.errorMessage = action.payload;
  },

  resetDeclarationProblem: (state: any) => {
    state.declarationProblem = initialState.declarationProblem;
  }
};

export default reducer;
