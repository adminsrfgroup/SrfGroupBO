import { userReducer } from './user.reducer';
import { initUserState, UserState } from '../state/user.state';
import { loadListUsersSuccess } from '../actions/list-user.actions';
import { PageCommon } from '../../../../../shared/models/page.common';
import { IUser } from '../../../../../shared/models/user.model';

describe('User Reducers', () => {
    it('should return init state', () => {
        const action = {
            type: 'Unknown',
        };
        const state = userReducer(initUserState, action);

        expect(state).toBe(initUserState);
    });

    it('should update the loading state in an immutable way', () => {
        const newState: UserState = {
            loading: false,
            entity: {},
            loadingEntities: false,
            errorMessage: null,
            entities: [],
            totalElements: 0,
            totalPages: 0,
        };
        const responseMock: PageCommon<IUser> = {
            content: [],
            totalElements: 0,
            totalPages: 0,
            numberOfElements: 0,
        };
        const action = loadListUsersSuccess({ payload: responseMock });
        const state = userReducer(initUserState, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });
});
