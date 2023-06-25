import { IAddress } from './address.model';

export interface IUser {
    id?: any;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    imageUrl?: string;
    langKey?: string;
    authorities?: any[];
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
}

export const defaultValue: Readonly<IUser> = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    activated: true,
    langKey: '',
    authorities: [],
    createdBy: '',
    createdDate: null,
    lastModifiedBy: '',
    lastModifiedDate: null,
    password: '',
    phone: '',
    registerDate: '',
};

export interface IGooglePlus {
    Ba: string;
    tokenId: string;
    googleId: string;
    profileObj: any;
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
    picture: any;
    signedRequest: string;
    userID: string;
    sourceConnectedDevice: string;
    idOneSignal: string;
}
