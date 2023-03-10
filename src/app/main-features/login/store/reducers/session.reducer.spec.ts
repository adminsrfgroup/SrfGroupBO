import { sessionReducer } from './session.reducer';
import { initSessionState, SessionState } from '../state/session.state';
import { IResponseSession } from '../../models/login.model';
import { sessionActionSuccess } from '../actions/session.action';
import { IUser } from '../../../../shared/models/user.model';

describe('Session Selectors', () => {
    it('should return init state', () => {
        const action = {
            type: 'Unknown',
        };
        const state = sessionReducer(initSessionState, action);

        expect(state).toBe(initSessionState);
    });

    it('should update the session state in an immutable way', () => {
        const newState: SessionState = {
            isAuthenticated: true,
            token: '',
            currentUser: {
                id: 1,
                username: 'test@test.com',
                email: 'test@test.com',
            },
            nbeNotificationsNotRead: 0,
            nbeMessagesNotRead: 0,
            nbeCarts: 0,
            oneSignalId: '',
            loading: false,
            errorMessage: '',
        };
        const responseMock: IUser = {
            id: 1,
            username: 'test@test.com',
            email: 'test@test.com',
        };
        const action = sessionActionSuccess({ payload: responseMock });
        const state = sessionReducer(initSessionState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });
});
