import { IContactUs } from '../../../../../shared/models/contact-us.model';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { INewsLetter } from '../../../../../shared/models/newsletter.model';
import { IFaq } from '../../../../../shared/models/faq.model';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export interface IContactUsState {
    loading: boolean;
    entity: IContactUs;
    loadingEntities: boolean;
    entities: IContactUs[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;
}

export interface IAboutUsState {
    loading: boolean;
    entity: IAboutUs;
    loadingEntities: boolean;
    entities: IAboutUs[];
    totalElements: number;
    totalPages: number;
    errorMessage: string;

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
    errorMessage: string;
}

export interface ICguState {
    loading: boolean;
    entity: ICgu;
    errorMessage: string;

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
    errorMessage: string;

    addSuccess: boolean;
    updateSuccess: boolean;
}

export interface ISupportState /*extends EntityState<IFaq>*/ {
    contactUs: IContactUsState;
    aboutUs: IAboutUsState;
    newsLetter: INewsLetterState;
    faq: IFaqState;

    cgu: ICguState;
}

export const adapterFaq: EntityAdapter<IFaqState> = createEntityAdapter<IFaqState>();

// export const initSupportState1: ISupportState = adapterFaq.getInitialState({
//     contactUs: {
//         loading: false,
//         entity: {},
//         loadingEntities: false,
//         entities: [],
//         totalElements: -1,
//         totalPages: -1,
//         errorMessage: '',
//     },
//     aboutUs: {
//         loading: false,
//         entity: {},
//         loadingEntities: false,
//         entities: [],
//         totalElements: -1,
//         totalPages: -1,
//         errorMessage: '',
//         addSuccess: false,
//         updateSuccess: false,
//     },
//     newsLetter: {
//         loading: false,
//         entity: {},
//         loadingEntities: false,
//         entities: [],
//         totalElements: -1,
//         totalPages: -1,
//         errorMessage: '',
//     },
//     faq: {
//         loading: false,
//         entity: {},
//         loadingEntities: false,
//         entities: [],
//         totalElements: -1,
//         totalPages: -1,
//         errorMessage: '',
//         addSuccess: false,
//         updateSuccess: false,
//     },
//     cgu: {
//         loading: false,
//         entity: {},
//         errorMessage: '',
//         addSuccess: false,
//         updateSuccess: false,
//     },
// });

export const initSupportState: ISupportState = {
    contactUs: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
    },
    aboutUs: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
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
        errorMessage: '',
    },
    faq: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        totalPages: -1,
        errorMessage: '',
        addSuccess: false,
        updateSuccess: false,
    },
    cgu: {
        loading: false,
        entity: {},
        errorMessage: '',
        addSuccess: false,
        updateSuccess: false,
    },
};
