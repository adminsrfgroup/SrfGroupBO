import { IOffer } from './offer.model';

export interface ISellOffer extends IOffer {
    id?: number;
    amount?: number | null;
    sellDate?: string | null;
    typeContactClient?: string | null;
    shippingCost?: number;
}

export const defaultValue: Readonly<ISellOffer> = {};
