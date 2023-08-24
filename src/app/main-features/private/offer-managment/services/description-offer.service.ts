import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IDescriptionAddOffer } from '../../../../shared/models/description-add-offer.model';

@Injectable({
    providedIn: 'root',
})
export class DescriptionOfferService {
    httpClient = inject(HttpClient);

    fetchDescriptionOffers(page: number, size: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}api/description-add-offers/admin/list`);
    }

    addDescriptionOffers(data: IDescriptionAddOffer): Observable<any> {
        return this.httpClient.post<any>(`${environment.baseUrl}api/description-add-offers/admin/create`, data);
    }
}
