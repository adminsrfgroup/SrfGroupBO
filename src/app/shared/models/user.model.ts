import { IAddress } from './address.model';
import { IAuthority } from './authority.model';

export interface IUser {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    imageUrl?: string;
    langKey?: string;
    authorities?: IAuthority[];
    createdBy?: string;
    createdDate?: Date | null;
    lastModifiedBy?: string;
    lastModifiedDate?: Date | null;
    password?: string;
    sourceConnectedDevice?: string;
    address?: IAddress;
    phone?: string;
    linkProfileFacebook?: string;
    registerDate?: string;
    activatedAccount?: boolean;
}

export const defaultValue: Readonly<IUser> = {};

export interface IGooglePlus {
    Ba: string;
    tokenId: string;
    googleId: string;
    profileObj: string;
    idOneSignal: string;
    sourceConnectedDevice: string;
}

export interface IFacebook {
    accessToken: string;
    data_access_expiration_time: string;
    email?: string | null;
    graphDomain: string;
    id: string;
    name: string;
    picture: string;
    signedRequest: string;
    userID: string;
    sourceConnectedDevice: string;
    idOneSignal: string;
}
