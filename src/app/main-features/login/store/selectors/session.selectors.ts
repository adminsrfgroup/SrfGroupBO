import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../state/login.state';
import { SessionState } from '../state/session.state';

export const sessionSelectKey = 'session';
export const selectSessionState = createFeatureSelector<SessionState>(sessionSelectKey);
export const selectorLoadingSession = createSelector(selectSessionState, (state: SessionState) => state.loading);
export const selectorErrorMessageSession = createSelector(selectSessionState, (state: SessionState) => state.errorMessage);
export const selectorIsAuthenticatedSession = createSelector(selectSessionState, (state: SessionState) => state.isAuthenticated);
export const selectorCurrentUserSession = createSelector(selectSessionState, (state: SessionState) => state.currentUser);
export const selectorNbeNotificationsNotReadSession = createSelector(selectSessionState, (state: SessionState) => state.nbeNotificationsNotRead);
export const selectorNbeMessagesNotReadSession = createSelector(selectSessionState, (state: SessionState) => state.nbeMessagesNotRead);
export const selectorNbeCartsSession = createSelector(selectSessionState, (state: SessionState) => state.nbeCarts);
export const selectorCurrentSession = createSelector(selectSessionState, (state: SessionState) => state);
export const selectorOneSignalIdSession = createSelector(selectSessionState, (state: SessionState) => state.oneSignalId);
