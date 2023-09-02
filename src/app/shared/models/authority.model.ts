import { IPermission } from './permission.model';

export interface IAuthority {
    id?: number;
    name?: string;
    descriptionAr?: string;
    descriptionFr?: string;
    descriptionEn?: string;
    permissions?: IPermission[];
}

export const defaultValue: Readonly<IAuthority> = {};
