import {createAction, props} from "@ngrx/store";
import {PageCommon, Pagination} from "../../../../../shared/models/page.common";
import {IOffer} from "../../../../../shared/models/offer.model";

export const loadListOffers = createAction(
  '[ListOffer] Load ListOffers',
  props<Pagination>());

export const loadListOffersSuccess = createAction('[ListOffer] Load ListOffers Success', props<{ payload: PageCommon<IOffer> }>());

export const loadListOffersFailure = createAction('[ListOffer] Load ListOffers Failure', props<{ error: any }>());

export const setActivePageOffers = createAction(
  '[ListOffer] Set Active Page ListOffers',
  props<Pagination>()
);

export const resetListOffers = createAction('[ListOffer] Reset ListOffers');
