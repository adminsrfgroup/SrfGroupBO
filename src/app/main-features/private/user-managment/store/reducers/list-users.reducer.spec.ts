import { userReducer } from './user.reducer';
import { IListUsers, initUserState } from '../state/user.state';
import { loadListUsersSuccess } from '../actions/list-user.actions';
import { PageCommon } from '../../../../../shared/models/page.common';
import { IUser } from '../../../../../shared/models/user.model';
import { listUserReducer } from './list-users.reducer';

describe('User Reducers', () => {
    it('should return init state', () => {
        const action = {
            type: 'Unknown',
        };
        const state = userReducer(initUserState, action);

        expect(state).toBe(initUserState);
    });

    it('should update the loading state in an immutable way', () => {
        const newState: IListUsers = {
            loading: false,
            entity: {},
            loadingEntities: false,
            errorMessage: '',
            entities: [],
            totalElements: 0,
            totalPages: 0,
            updateAuthoritiesSuccess: false,
            authorities: [],
        };
        const responseMock: PageCommon<IUser> = {
            content: [],
            totalElements: 0,
            totalPages: 0,
            numberOfElements: 0,
        };
        const action = loadListUsersSuccess({ payload: responseMock });
        const state = listUserReducer(initUserState.listUsers, action);

        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });
});
