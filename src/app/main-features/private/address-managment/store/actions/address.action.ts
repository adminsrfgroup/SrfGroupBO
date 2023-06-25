import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IAddress } from '../../../../../shared/models/address.model';

export const loadListAddress = createAction('[ListAddress] Load ListAddress', props<Pagination>());

export const loadListAddressSuccess = createAction('[Address] Load ListAddress Success', props<{ payload: PageCommon<IAddress> }>());

export const loadListAddressFailure = createAction('[Address] Load ListAddress Failure', props<{ error: any }>());

export const setActivePageAddress = createAction('[ListAddress] Set Active Page ListAddress', props<Pagination>());

export const resetAddress = createAction('[Address] Reset Address');
