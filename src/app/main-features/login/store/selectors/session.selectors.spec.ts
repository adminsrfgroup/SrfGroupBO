import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState } from '../state/login.state';
import { selectorLoadingLogin, selectorTokenLogin } from './login.selectors';
import { SessionState } from '../state/session.state';
import { IUser } from '../../../../shared/models/user.model';
import { selectorCurrentSession, selectorIsAuthenticatedSession } from './session.selectors';

describe('Login  Selectors', () => {
    it('should select the isAuthenticated', () => {
        // Given
        const initialState: SessionState = {
            isAuthenticated: true,
            token: '',
            currentUser: {} as IUser,
            nbeNotificationsNotRead: 0,
            nbeMessagesNotRead: 0,
            nbeCarts: 0,
            oneSignalId: '',
            loading: false,
            errorMessage: '',
        };

        // When
        const result = selectorIsAuthenticatedSession.projector(initialState);

        // Then
        expect(result).toEqual(true);
    });

    it('should select the currentUser', () => {
        // Given
        const initialState: SessionState = {
            isAuthenticated: true,
            token: '',
            currentUser: {} as IUser,
            nbeNotificationsNotRead: 0,
            nbeMessagesNotRead: 0,
            nbeCarts: 0,
            oneSignalId: '',
            loading: false,
            errorMessage: '',
        };

        // When
        const result = selectorCurrentSession.projector(initialState);

        // Then
        expect(result).toEqual({
            isAuthenticated: true,
            token: '',
            currentUser: {} as IUser,
            nbeNotificationsNotRead: 0,
            nbeMessagesNotRead: 0,
            nbeCarts: 0,
            oneSignalId: '',
            loading: false,
            errorMessage: '',
        });
    });
});
