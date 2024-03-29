export interface ICity {
    id?: number;
    city?: string | null;
    lat?: number | null;
    lng?: number | null;
    country?: string | null;
    iso2?: string | null;
    admin_name?: string | null;
    capital?: string | null;
    population?: string | null;
    population_proper?: string | null;
}

export const defaultValue: Readonly<ICity> = {};
