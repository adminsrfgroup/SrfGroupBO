import { initLoginState, LoginState } from '../state/login.state';
import { loginReducer } from './login.reducer';
import { loginActionSuccess } from '../actions/login.action';
import { IResponseLogin } from '../../models/login.model';

describe('Login Selectors', () => {
    it('should return init state', () => {
        const action = {
            type: 'Unknown',
        };
        const state = loginReducer(initLoginState, action);

        expect(state).toBe(initLoginState);
    });

    it('should update the login state in an immutable way', () => {
        const newState: LoginState = {
            loading: false,
            errorMessage: '',
            token: 'azerty',
            refreshToken: 'azerty',
        };
        const responseMock: IResponseLogin = {
            token: 'azerty',
            refreshToken: 'azerty',
        };
        const action = loginActionSuccess({ payload: responseMock });
        const state = loginReducer(initLoginState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });
});
