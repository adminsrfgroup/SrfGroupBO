import {IUser} from "../../../shared/models/user.model";

export interface ILogin {
    email: string;
    password: string;
    idOneSignal: string;
    rememberMe: boolean;
}

export interface IResponseLogin {
    refreshToken: string;
    token: string;
}

export interface IResponseSession {
  isAuthenticated: boolean;
  token: string;
  currentUser: IUser;
  nbeNotificationsNotRead: number;
  nbeMessagesNotRead: number;
  nbeCarts: number;
  oneSignalId: string;
}
