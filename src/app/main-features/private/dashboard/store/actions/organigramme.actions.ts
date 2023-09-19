import {createAction, props} from "@ngrx/store";
import {IOrganigramme} from "../../../../../shared/models/organigramme.model";
import {IErrorMessage} from "../../../../../shared/models/error-message";

export const loadOrganigramme = createAction('[Organigramme] Load Organigramme');

export const loadOrganigrammeSuccess = createAction('[Organigramme] Load Organigramme Success', props<{ payload: IOrganigramme }>());

export const loadOrganigrammeFailure = createAction('[Organigramme] Load Organigramme Failure', props<{ error: IErrorMessage }>());

export const updateOrganigramme = createAction('[Organigramme] Update Organigramme', props<IOrganigramme>());

export const updateOrganigrammeSuccess = createAction('[Organigramme] Update Organigramme Success', props<{ payload: IOrganigramme }>());

export const updateOrganigrammeFailure = createAction('[Organigramme] Update Organigramme Failure', props<{ error: IErrorMessage }>());


export const addOrganigramme = createAction('[Organigramme] Add Organigramme', props<IOrganigramme>());

export const addOrganigrammeSuccess = createAction('[Organigramme] Add Organigramme Success', props<{ payload: IOrganigramme }>());

export const addOrganigrammeFailure = createAction('[Organigramme] Add Organigramme Failure', props<{ error: IErrorMessage }>());
