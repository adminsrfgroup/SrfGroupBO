import {ActionReducer, createReducer, on} from "@ngrx/store";
import {
  resetListOffers
} from "../../../offer-managment/store/actions/offer.actions";
import {ContactUsState, initSupportState} from "../state/support.state";
import {loadListContactUs, loadListContactUsFailure, loadListContactUsSuccess} from "../actions/contact-us.actions";

export const contactUsReducer: ActionReducer<ContactUsState> = createReducer(
  initSupportState.contactUs,
  on(loadListContactUs, (state: ContactUsState) => {
    return {
      ...state,
      loadingEntities: true,
      totalPages: 0,
      totalItems: 0,
    };
  }),
  on(loadListContactUsSuccess, (state: ContactUsState, action: ReturnType<typeof loadListContactUsSuccess>) => {
    return {
      ...state,
      loadingEntities: false,
      entities: action.payload.content,
      totalElements: action.payload.totalElements,
      totalPages: action.payload.totalPages,
    };
  }),
  on(loadListContactUsFailure, (state: ContactUsState, action: ReturnType<typeof loadListContactUsFailure>) => {
    return {
      ...state,
      loadingEntities: false,
      errorMessage: action.error,
    };
  }),

  on(resetListOffers, () => {
    return {
      ...initSupportState.contactUs,
    };
  })
);
