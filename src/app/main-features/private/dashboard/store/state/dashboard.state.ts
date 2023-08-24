export interface ILogState {
    loadingEntities: boolean;
    entities: any;
    errorMessage: any;
}

export interface IDashboardState {
    log: ILogState;
}

export const initDashboardState: IDashboardState = {
    log: {
        loadingEntities: false,
        entities: {},
        errorMessage: null,
    },
};
