import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PageCommon } from '../../../../shared/models/page.common';
import { IOffer } from '../../../../shared/models/offer.model';

@Injectable({
    providedIn: 'root',
})
export class OfferService {
    constructor(private httpClient: HttpClient) {}

    fetchAllOffers(page: number, size: number): Observable<PageCommon<IOffer>> {
        return this.httpClient.get<PageCommon<IOffer>>(`${environment.baseUrl}api/offer/public?page=${page}&size=${size}`);
    }
}
