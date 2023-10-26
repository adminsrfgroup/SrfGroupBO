import { IUser } from '../../../../../shared/models/user.model';
import { IAuthority } from '../../../../../shared/models/authority.model';

export interface IListUsers {
    loading: boolean;
    entity: IUser;
    loadingEntities: boolean;
    entities: IUser[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;
    updateAuthoritiesSuccess: boolean;
    authorities: IAuthority[];
}

export interface IDetailsUsers {
    loading: boolean;
    entity: IUser;
    loadingEntities: boolean;
    entities: IUser[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;
    updateAuthoritiesSuccess: boolean;
    authorities: IAuthority[];
}

export interface UserState {
    listUsers: IListUsers;
    detailsUsers: IDetailsUsers;
}

export const initUserState: UserState = {
    listUsers: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        updateAuthoritiesSuccess: false,
        authorities: [],
    },
    detailsUsers: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        updateAuthoritiesSuccess: false,
        authorities: [],
    },
};
