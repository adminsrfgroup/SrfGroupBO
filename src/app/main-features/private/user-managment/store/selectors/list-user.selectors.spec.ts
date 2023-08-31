import { initUserState, UserState } from '../state/user.state';
import { selectorUser } from './user.selectors';

describe('ListUser Selectors', () => {
    it('should select the feature state', () => {
        // Given
        const initialState: UserState = initUserState;

        // When
        const resultUser = selectorUser.projector(initialState);

        // Then
        expect(resultUser.loading).toEqual(false);
    });
});
