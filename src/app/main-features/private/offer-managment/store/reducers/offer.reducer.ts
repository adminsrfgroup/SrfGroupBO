import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {OfferState, initOfferState} from "../state/offer.state";
import {loadListOffers, loadListOffersFailure, loadListOffersSuccess, resetListOffers} from "../actions/offer.actions";

export const offerReducer: ActionReducer<OfferState, Action> = createReducer(
  initOfferState,
  on(loadListOffers, (state: OfferState) => {
    return {
      ...state,
      loadingEntities: true,
      totalPages: 0,
      totalItems: 0,
    };
  }),
  on(loadListOffersSuccess, (state: OfferState, action: ReturnType<typeof loadListOffersSuccess>) => {
    return {
      ...state,
      loadingEntities: false,
      entities: action.payload.content,
      totalElements: action.payload.totalElements,
      totalPages: action.payload.totalPages,
    };
  }),
  on(loadListOffersFailure, (state: OfferState, action: ReturnType<typeof loadListOffersFailure>) => {
    return {
      ...state,
      loadingEntities: false,
      errorMessage: action.error,
    };
  }),

  on(resetListOffers, () => {
    return {
      ...initOfferState,
    };
  })
);
