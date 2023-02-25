import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {initUserState, UserState} from "../state/user.state";
import {loadListUsers, loadListUsersFailure, loadListUsersSuccess, resetListUsers} from "../actions/list-user.actions";

export const userReducer: ActionReducer<UserState, Action> = createReducer(
  initUserState,
  on(loadListUsers, (state: UserState, action: ReturnType<typeof loadListUsers>) => {
    return {
      ...state,
      loadingEntities: true,
    };
  }),
  on(loadListUsersSuccess, (state: UserState, action: ReturnType<typeof loadListUsersSuccess>) => {
    return {
      ...state,
      loadingEntities: false,
      entities: action.payload.content,
      totalElements: action.payload.totalElements,
      totalPages: action.payload.totalPages,
    };
  }),
  on(loadListUsersFailure, (state: UserState, action: ReturnType<typeof loadListUsersFailure>) => {
    return {
      ...state,
      loadingEntities: false,
      errorMessage: action.error,
    };
  }),
  on(resetListUsers, () => {
    return {
      ...initUserState
    };
  }),
)
