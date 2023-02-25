import {IUser} from "../../../../../shared/models/user.model";

export interface UserState {
  loadingEntities: boolean;
  entities: IUser[];
  totalElements: number;
  totalPages: number;
  errorMessage: any;
}

export const initUserState: UserState = {
  loadingEntities: false,
  entities: [],
  totalElements: -1,
  totalPages: 0,
  errorMessage: null
};
