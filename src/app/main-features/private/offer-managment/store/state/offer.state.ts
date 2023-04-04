import {IOffer} from "../../../../../shared/models/offer.model";

export interface OfferState {
  loading: boolean;
  entity: IOffer;
  loadingEntities: boolean;
  entities: IOffer[];
  totalElements: number;
  totalPages: number;
  errorMessage: any;
}

export const initOfferState: OfferState = {
  loading: false,
  entity: {},
  loadingEntities: false,
  entities: [],
  totalElements: -1,
  totalPages: -1,
  errorMessage: null,
};
