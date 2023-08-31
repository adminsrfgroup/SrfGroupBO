import { IAuthority } from '../../../../../shared/models/authority.model';
import { IPermission } from '../../../../../shared/models/permission.model';

export interface IRoleAuthority {
    loading: boolean;
    entity: IAuthority;
    loadingEntities: boolean;
    entities: IAuthority[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
    activePage: number;

    updateSuccess: boolean;
    addSuccess: boolean;
    isFirstLoading: boolean;
}

export interface IRolePermission {
    loading: boolean;
    entity: IPermission;
    loadingEntities: boolean;
    entities: IPermission[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
    activePage: number;

    updateSuccess: boolean;
    addSuccess: boolean;
}

export interface RoleState {
    permission: IRolePermission;
    authority: IRoleAuthority;
    userAuthority: any;
}

export const initRoleState: RoleState = {
    permission: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        addSuccess: false,
        errorMessage: null,
        totalElements: -1,
        totalPages: -1,
        activePage: 5,
    },
    authority: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        addSuccess: false,
        errorMessage: null,
        totalElements: -1,
        totalPages: -1,
        activePage: 5,
        isFirstLoading: true,
    },
    userAuthority: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        addSuccess: false,
        errorMessage: null,
        totalItems: -1,
        totalPages: 0,
    },
};
