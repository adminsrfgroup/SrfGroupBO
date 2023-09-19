import {IOrganigramme} from "../../../../../shared/models/organigramme.model";
import {IErrorMessage} from "../../../../../shared/models/error-message";

export interface ILogState {
    loadingEntities: boolean;
    entities: any;
    errorMessage: string;
}

export interface IMetricsState {
    loadingEntities: boolean;
    entities: any;
    errorMessage: string;
    totalElements: number;
}

export interface IOrganigrammeState {
    loading: boolean;
    entity: IOrganigramme;
    errorMessage: IErrorMessage;
    updateSuccess: boolean;
    addSuccess: boolean;
}

export interface IDashboardState {
    log: ILogState;
    metrics: IMetricsState;
    organigramme: IOrganigrammeState;
}

export const initDashboardState: IDashboardState = {
    log: {
        loadingEntities: false,
        entities: {},
        errorMessage: '',
    },
    metrics: {
        loadingEntities: false,
        entities: [],
        totalElements: -1,
        errorMessage: '',
    },
    organigramme: {
        loading: false,
        entity: {},
        errorMessage: {},
        updateSuccess: false,
        addSuccess: false,
    },
};
