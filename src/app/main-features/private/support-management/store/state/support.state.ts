import { IContactUs } from '../../../../../shared/models/contact-us.model';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { INewsLetter } from '../../../../../shared/models/newsletter.model';
import { IFaq } from '../../../../../shared/models/faq.model';
import { ICgu } from '../../../../../shared/models/cgu.model';

export interface IContactUsState {
    loading: boolean;
    entity: IContactUs;
    loadingEntities: boolean;
    entities: IContactUs[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
}

export interface IAboutUsState {
    loading: boolean;
    entity: IAboutUs;
    loadingEntities: boolean;
    entities: IAboutUs[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;

    addSuccess: boolean;
    updateSuccess: boolean;
}

export interface INewsLetterState {
    loading: boolean;
    entity: INewsLetter;
    loadingEntities: boolean;
    entities: INewsLetter[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;
}

export interface ICguState {
    loading: boolean;
    entity: ICgu;
    errorMessage: any;

    addSuccess: boolean;
    updateSuccess: boolean;
}

export interface IFaqState {
    loading: boolean;
    entity: IFaq;
    loadingEntities: boolean;
    entities: IFaq[];
    totalElements: number;
    totalPages: number;
    errorMessage: any;

    addSuccess: boolean;
    updateSuccess: boolean;
}

export interface ISupportState {
    contactUs: IContactUsState;
    aboutUs: IAboutUsState;
    newsLetter: INewsLetterState;
    faq: IFaqState;

    cgu: ICguState;
}

export const initSupportState: ISupportState = {
    contactUs: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: null,
    },
    aboutUs: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: null,
        addSuccess: false,
        updateSuccess: false,
    },
    newsLetter: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: null,
    },
    faq: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: null,
        addSuccess: false,
        updateSuccess: false,
    },
    cgu: {
        loading: false,
        entity: {},
        errorMessage: null,
        addSuccess: false,
        updateSuccess: false,
    },
};
