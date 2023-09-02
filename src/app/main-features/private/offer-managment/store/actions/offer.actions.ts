import { createAction, props } from '@ngrx/store';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { IOffer } from '../../../../../shared/models/offer.model';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';

export const loadListOffers = createAction('[ListOffer] Load ListOffers', props<Pagination>());

export const loadListOffersSuccess = createAction('[ListOffer] Load ListOffers Success', props<{ payload: PageCommon<IOffer> }>());

export const loadListOffersFailure = createAction('[ListOffer] Load ListOffers Failure', props<{ error: string }>());

export const setActivePageOffers = createAction('[ListOffer] Set Active Page ListOffers', props<Pagination>());

export const resetListOffers = createAction('[ListOffer] Reset ListOffers');

export const loadListDescriptionNewOffer = createAction('[ListDescriptionNewOffer] Load ListDescriptionNewOffer', props<Pagination>());

export const loadListDescriptionNewOfferSuccess = createAction('[ListDescriptionNewOffer] Load ListDescriptionNewOffer Success', props<{ payload: PageCommon<IDescriptionAddOffer> }>());

export const loadListDescriptionNewOfferFailure = createAction('[ListDescriptionNewOffer] Load ListDescriptionNewOffer Failure', props<{ error: string }>());

export const setActivePageListDescriptionNewOffer = createAction('[ListDescriptionNewOffer] Set Active Page ListDescriptionNewOffer', props<Pagination>());

export const addDescriptionNewOffer = createAction('[AddDescriptionNewOffer] Load AddDescriptionNewOffer', props<IDescriptionAddOffer>());

export const addDescriptionNewOfferSuccess = createAction('[AddDescriptionNewOffer] Load AddDescriptionNewOffer Success', props<{ payload: IDescriptionAddOffer }>());

export const addDescriptionNewOfferFailure = createAction('[AddDescriptionNewOffer] Load AddDescriptionNewOffer Failure', props<{ error: string }>());

export const resetListDescriptionNewOffer = createAction('[ListDescriptionNewOffer] Reset ListDescriptionNewOffer');
