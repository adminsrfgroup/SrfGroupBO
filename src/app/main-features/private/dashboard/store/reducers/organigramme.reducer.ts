import {ActionReducer, createReducer, on} from "@ngrx/store";
import { initDashboardState, IOrganigrammeState} from "../state/dashboard.state";
import {
    addOrganigramme, addOrganigrammeFailure, addOrganigrammeSuccess,
    loadOrganigramme, loadOrganigrammeFailure, loadOrganigrammeSuccess,
    updateOrganigramme,
    updateOrganigrammeFailure,
    updateOrganigrammeSuccess
} from "../actions/organigramme.actions";

export const organigrammeReducer: ActionReducer<IOrganigrammeState> = createReducer(
    initDashboardState.organigramme,
    on(updateOrganigramme, (state: IOrganigrammeState) => {
        return {
            ...state,
            loading: true,
            updateSuccess: false,
        };
    }),
    on(updateOrganigrammeSuccess, (state: IOrganigrammeState, action: ReturnType<typeof updateOrganigrammeSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            updateSuccess: true,
        };
    }),
    on(updateOrganigrammeFailure, (state: IOrganigrammeState, action: ReturnType<typeof updateOrganigrammeFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(addOrganigramme, (state: IOrganigrammeState) => {
        return {
            ...state,
            loading: true,
            addSuccess: false,
        };
    }),
    on(addOrganigrammeSuccess, (state: IOrganigrammeState, action: ReturnType<typeof addOrganigrammeSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
            addSuccess: true,
        };
    }),
    on(addOrganigrammeFailure, (state: IOrganigrammeState, action: ReturnType<typeof addOrganigrammeFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    }),

    on(loadOrganigramme, (state: IOrganigrammeState) => {
        return {
            ...state,
            loading: true
        };
    }),
    on(loadOrganigrammeSuccess, (state: IOrganigrammeState, action: ReturnType<typeof loadOrganigrammeSuccess>) => {
        return {
            ...state,
            loading: false,
            entity: action.payload,
        };
    }),
    on(loadOrganigrammeFailure, (state: IOrganigrammeState, action: ReturnType<typeof loadOrganigrammeFailure>) => {
        return {
            ...state,
            loading: false,
            errorMessage: action.error,
        };
    })
);
