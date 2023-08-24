export interface IPermission {
    id?: number;
    name?: string;
    pathApi?: string;
    description?: string;
}

export const defaultValue: Readonly<IPermission> = {};
