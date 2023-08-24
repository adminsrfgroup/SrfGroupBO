export interface IAuthority {
    id?: number;
    name?: string;

    descriptionAr?: string;
    descriptionFr?: string;
    descriptionEn?: string;
    permission?: any[];
}

export const defaultValue: Readonly<IAuthority> = {};
