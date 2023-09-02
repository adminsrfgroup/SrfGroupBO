import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IAddress } from '../../../../../shared/models/address.model';

export const loadListAddress = createAction('[ListAddress] Load ListAddress', props<Pagination>());

export const loadListAddressSuccess = createAction('[Address] Load ListAddress Success', props<{ payload: PageCommon<IAddress> }>());

export const loadListAddressFailure = createAction('[Address] Load ListAddress Failure', props<{ error: string }>());

export const setActivePageAddress = createAction('[ListAddress] Set Active Page ListAddress', props<Pagination>());

export const importAddress = createAction('[ImportAddress] Load ImportAddress');

export const importAddressSuccess = createAction('[ImportAddress] Load ListAddress Success', props<{ payload: string }>());

export const importAddressFailure = createAction('[ImportAddress] Load ImportAddress Failure', props<{ error: string }>());

export const resetAddress = createAction('[Address] Reset Address');
