export interface IAuthority {
    id?: number;
    name?: string;
    descriptionAr?: string;
    descriptionFr?: string;
    descriptionEn?: string;
    permissions?: any[];
}

export const defaultValue: Readonly<IAuthority> = {};
