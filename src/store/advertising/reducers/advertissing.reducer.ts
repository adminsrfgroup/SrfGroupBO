import { initialState } from "@store/advertising/initial.state";

const reducer = {
  fetchAdvertisings: (state: any) => {
    state.advertisingOffer.loadingEntities = true;
  },
  fetchAdvertisingsSuccess: (state: any, action: any) => {
    state.advertisingOffer.loadingEntities = false;
    state.advertisingOffer.entities = [
      ...state.advertisingOffer.entities,
      ...action.payload.content
    ];
    state.advertisingOffer.totalItems = action.payload?.totalElements;
    state.advertisingOffer.totalPages = action.payload?.totalPages;
  },
  fetchAdvertisingsFailure: (state: any) => {
    state.advertisingOffer.loadingEntities = false;
  },

  addAdvertisingOffer: (state: any) => {
    state.advertisingOffer.loading = true;
    state.advertisingOffer.addSuccess = false;
  },
  addAdvertisingOfferSuccess: (state: any, action: any) => {
    state.advertisingOffer.loading = false;
    state.advertisingOffer.addSuccess = true;
    state.advertisingOffer.entity = action.payload;
  },
  addAdvertisingOfferFailure: (state: any) => {
    state.advertisingOffer.loading = false;
  },

  removeAdvertisingOffer: (state: any) => {
    state.advertisingOffer.loading = true;
    state.advertisingOffer.deleteSuccess = false;
  },
  removeAdvertisingOfferSuccess: (state: any) => {
    state.advertisingOffer.loading = false;
    state.advertisingOffer.deleteSuccess = true;
  },
  removeAdvertisingOfferFailure: (state: any) => {
    state.advertisingOffer.loading = false;
  },

  resetAdvertisings: (state: any) => {
    state.advertisingOffer = initialState.advertisingOffer;
  }
};
export default reducer;
