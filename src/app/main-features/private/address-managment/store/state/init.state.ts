import { IAddress } from '../../../../../shared/models/address.model';

export interface AddressState {
    loading: boolean;
    entity: IAddress;
    loadingEntities: boolean;
    entities: IAddress[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
    activePage: number;
}

export const initAddressState: AddressState = {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    totalElements: -1,
    totalPages: -1,
    errorMessage: '',
    activePage: 5,
};
