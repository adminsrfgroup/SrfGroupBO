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

export interface IDashboardState {
    log: ILogState;
    metrics: IMetricsState;
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
};
