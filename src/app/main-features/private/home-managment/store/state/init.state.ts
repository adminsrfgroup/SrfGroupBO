import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';

export interface ITopSlides {
    loading: boolean;
    entity: ITopHomeSlidesImages;
    loadingEntities: boolean;
    entities: ITopHomeSlidesImages[];
    updateSuccess: boolean;
    loadingReport: boolean;
    reportSuccess: boolean;
    errorMessage: string;
    totalItems: number;
    totalPages: number;
    loadingImport: boolean;
    addSuccess: boolean;
    deleteSuccess: boolean;
}

export interface IFeatureHome {
    loading: boolean;
    entity: any;
    loadingEntities: boolean;
    entities: any[];
    updateSuccess: boolean;
    loadingReport: boolean;
    reportSuccess: boolean;
    errorMessage: string;
    totalItems: number;
    totalPages: number;
    loadingImport: boolean;
    addSuccess: boolean;
    deleteSuccess: boolean;
}

export interface HomeState {
    topSlides: ITopSlides;
    featureHome: IFeatureHome;
}

export const initHomeState: HomeState = {
    topSlides: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        loadingReport: false,
        reportSuccess: false,
        errorMessage: '',
        totalItems: -1,
        totalPages: -1,
        loadingImport: false,
        addSuccess: false,
        deleteSuccess: false,
    },
    featureHome: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        loadingReport: false,
        reportSuccess: false,
        errorMessage: '',
        totalItems: -1,
        totalPages: -1,
        loadingImport: false,
        addSuccess: false,
        deleteSuccess: false,
    },
};
