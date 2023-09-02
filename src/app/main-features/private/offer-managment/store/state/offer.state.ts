import { IOffer } from '../../../../../shared/models/offer.model';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';

export interface IOfferState {
    loading: boolean;
    entity: IOffer;
    loadingEntities: boolean;
    entities: IOffer[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;
    activePage: number;
}

export interface IDescriptionNewOfferState {
    loading: boolean;
    entity: IDescriptionAddOffer;
    loadingEntities: boolean;
    entities: IDescriptionAddOffer[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;
    activePage: number;
    addSuccess: boolean;
    updateSuccess: boolean;
}

export interface IMainOfferState {
    offers: IOfferState;
    descriptionNewOffer: IDescriptionNewOfferState;
}

export const initOfferState: IMainOfferState = {
    offers: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        activePage: 5,
    },
    descriptionNewOffer: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        activePage: 5,
        addSuccess: false,
        updateSuccess: false,
    },
};
