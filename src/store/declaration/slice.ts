import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import declarationProblemReducer from "./reducers/declaration-problem.reducer";

export const DECLARATION_PROBLEM_KEY_IN_STORE = "declarationProblem";

export const declarationProblemSlice: Slice = createSlice({
  name: DECLARATION_PROBLEM_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...declarationProblemReducer
  }
});

export const {
  //? ********************| FETCH DECLARATION PROBLEM ACTIONS |*******************/
  fetchDeclarationProblem,
  fetchDeclarationProblemSuccess,
  fetchDeclarationProblemFailure,

  //? ********************| RESET DECLARATION PROBLEM ACTIONS |*******************/
  resetDeclarationProblem
} = declarationProblemSlice.actions;

//? ********************| FETCH USERS SELECTORS |*******************/DECLARATION_PROBLEM_KEY_IN_STORE
export const loadingEntitiesDeclarationProblem = (state: any) =>
  state[DECLARATION_PROBLEM_KEY_IN_STORE].declarationProblem.loadingEntities;
export const entitiesDeclarationProblem = (state: any) =>
  state[DECLARATION_PROBLEM_KEY_IN_STORE].declarationProblem.entities;
export const totalItemsDeclarationProblem = (state: any) =>
  state[DECLARATION_PROBLEM_KEY_IN_STORE].declarationProblem.totalItems;
export const totalPagesDeclarationProblem = (state: any) =>
  state[DECLARATION_PROBLEM_KEY_IN_STORE].declarationProblem.totalPages;
