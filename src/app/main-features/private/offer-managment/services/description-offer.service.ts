import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IDescriptionAddOffer } from '../../../../shared/models/description-add-offer.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class DescriptionOfferService {
    httpClient = inject(HttpClient);

    fetchDescriptionOffers(page: number, size: number): Observable<PageCommon<IDescriptionAddOffer>> {
        return this.httpClient.get<PageCommon<IDescriptionAddOffer>>(`${environment.baseUrl}api/description-add-offers/admin/list?page=${page}&size=${size}`);
    }

    addDescriptionOffers(data: IDescriptionAddOffer): Observable<IDescriptionAddOffer> {
        return this.httpClient.post<IDescriptionAddOffer>(`${environment.baseUrl}api/description-add-offers/admin/create`, data);
    }
}
