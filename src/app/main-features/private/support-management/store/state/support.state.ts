import {IContactUs} from "../../../../../shared/models/contact-us.model";

export interface ContactUsState {
  loading: boolean;
  entity: IContactUs;
  loadingEntities: boolean;
  entities: IContactUs[];
  totalElements: number;
  totalPages: number;
  errorMessage: any;
}

export interface SupportState {
  contactUs: ContactUsState;
}

export const initSupportState: SupportState = {
  contactUs: {
    loading: false,
    entity: {},
    loadingEntities: false,
    entities: [],
    totalElements: -1,
    totalPages: -1,
    errorMessage: null,
  }
};
