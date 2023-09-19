import { IUser } from '../../../../../shared/models/user.model';
import { IAuthority } from '../../../../../shared/models/authority.model';

export interface UserState {
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

export const initUserState: UserState = {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    totalElements: -1,
    totalPages: -1,
    errorMessage: '',
    updateAuthoritiesSuccess: false,
    authorities: [],
};
