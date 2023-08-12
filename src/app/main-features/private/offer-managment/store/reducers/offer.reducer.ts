import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import {initOfferState, IMainOfferState} from '../state/offer.state';
import {
  addDescriptionNewOffer, addDescriptionNewOfferFailure, addDescriptionNewOfferSuccess,
  loadListDescriptionNewOffer, loadListDescriptionNewOfferFailure, loadListDescriptionNewOfferSuccess,
  loadListOffers,
  loadListOffersFailure,
  loadListOffersSuccess, resetListDescriptionNewOffer,
  resetListOffers, setActivePageListDescriptionNewOffer,
  setActivePageOffers
} from '../actions/offer.actions';

export const offerReducer: ActionReducer<IMainOfferState, Action> = createReducer(
    initOfferState,
    on(loadListOffers, (state: IMainOfferState) => {
        return {
            ...state,
            offers:{
              ...state.offers,
              loadingEntities: true,
              totalPages: 0,
              totalItems: 0,
            }
        };
    }),
    on(loadListOffersSuccess, (state: IMainOfferState, action: ReturnType<typeof loadListOffersSuccess>) => {
        return {
          ...state,
          offers:{
            ...state.offers,
            loadingEntities: false,
            entities: action.payload.content,
            totalElements: action.payload.totalElements,
            totalPages: action.payload.totalPages,
          }
        };
    }),
    on(loadListOffersFailure, (state: IMainOfferState, action: ReturnType<typeof loadListOffersFailure>) => {
        return {
            ...state,
            offers:{
              ...state.offers,
              loadingEntities: false,
              errorMessage: action.error,
            }
        };
    }),

    on(setActivePageOffers, (state: IMainOfferState, action: ReturnType<typeof setActivePageOffers>) => {
        return {
            ...state,
            offers:{
              ...state.offers,
              loadingEntities: true,
              activePage: action.page,
            }
        };
    }),

    on(resetListOffers, () => {
        return {
            ...initOfferState,
        };
    }),
    on(loadListDescriptionNewOffer, (state: IMainOfferState) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loadingEntities: true,
          totalPages: 0,
          totalItems: 0,
        }
      };
    }),
    on(loadListDescriptionNewOfferSuccess, (state: IMainOfferState, action: ReturnType<typeof loadListDescriptionNewOfferSuccess>) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loadingEntities: false,
          entities: action.payload.content,
          totalElements: action.payload.totalElements,
          totalPages: action.payload.totalPages,
        }
      };
    }),
    on(loadListDescriptionNewOfferFailure, (state: IMainOfferState, action: ReturnType<typeof loadListDescriptionNewOfferFailure>) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loadingEntities: false,
          errorMessage: action.error,
        }
      };
    }),
    on(setActivePageListDescriptionNewOffer, (state: IMainOfferState, action: ReturnType<typeof setActivePageListDescriptionNewOffer>) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loadingEntities: true,
          activePage: action.page,
        }
      };
    }),
    on(addDescriptionNewOffer, (state: IMainOfferState) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loading: true,
          addSuccess: false,
        }
      };
    }),
    on(addDescriptionNewOfferSuccess, (state: IMainOfferState, action: ReturnType<typeof addDescriptionNewOfferSuccess>) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          entity: action.payload,
          loading: false,
          addSuccess: true,
        }
      };
    }),
    on(addDescriptionNewOfferFailure, (state: IMainOfferState, action: ReturnType<typeof addDescriptionNewOfferFailure>) => {
      return {
        ...state,
        descriptionNewOffer:{
          ...state.descriptionNewOffer,
          loading: false,
          errorMessage: action.error
        }
      };
    }),
    on(resetListDescriptionNewOffer, () => {
      return {
        ...initOfferState,
      };
    }),
);
