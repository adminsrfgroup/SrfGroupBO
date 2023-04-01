import { IUser } from '../../../../../shared/models/user.model';

export interface UserState {
    loading: boolean;
    entity: IUser;
    loadingEntities: boolean;
    entities: IUser[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
}

export const initUserState: UserState = {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    totalElements: -1,
    totalPages: 0,
    errorMessage: null,
};
