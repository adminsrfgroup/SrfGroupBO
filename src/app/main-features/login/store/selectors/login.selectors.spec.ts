import { LoginState } from '../state/login.state';
import { selectorLoadingLogin, selectorTokenLogin } from './login.selectors';

describe('Login  Selectors', () => {
    it('should select the loading', () => {
        // Given
        const initialState: LoginState = {
            loading: false,
            errorMessage: '',
            token: 'azerty',
            refreshToken: 'azerty',
        };

        // When
        const result = selectorLoadingLogin.projector(initialState);

        // Then
        expect(result).toEqual(false);
    });

    it('should select the token', () => {
        // Given
        const initialState: LoginState = {
            loading: false,
            errorMessage: '',
            token: 'azerty',
            refreshToken: 'azerty',
        };

        // When
        const result = selectorTokenLogin.projector(initialState);

        // Then
        expect(result).toEqual({
            token: 'azerty',
            refreshToken: 'azerty',
        });
    });
});
