import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { initSessionState, SessionState } from '../state/session.state';
import {
  logoutAction,
  sessionAction,
  sessionActionFailure,
  sessionActionSuccess
} from '../actions/session.action';

export const sessionReducer: ActionReducer<SessionState, Action> = createReducer(
    initSessionState,
    on(sessionAction, (state: SessionState) => {
        return {
            ...state,
            loading: true,
        };
    }),
    on(sessionActionSuccess, (state: SessionState, action: ReturnType<typeof sessionActionSuccess>) => {
        return {
            ...state,
            loading: false,
            currentUser: action.payload,
            isAuthenticated: true,
        };
    }),
    on(sessionActionFailure, (state: SessionState, action: ReturnType<typeof sessionActionFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(logoutAction, () => {
      return {
        isAuthenticated: false,
        token: '',
        currentUser: {},
        nbeNotificationsNotRead: 0,
        nbeMessagesNotRead: 0,
        nbeCarts: 0,
        oneSignalId: '',
        loading: false,
        errorMessage: ''
      };
    })
);
