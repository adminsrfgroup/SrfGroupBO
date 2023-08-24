import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IFaq } from '../../../../shared/models/faq.model';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    constructor(private httpClient: HttpClient) {}

    fetchAllFaq(page: number, size: number): Observable<IFaq> {
        return this.httpClient.get<IFaq>(`${environment.baseUrl}api/faq/public?page=${page}&size=${size}`);
    }

    addFaq(data: IFaq): Observable<IFaq> {
        return this.httpClient.post<IFaq>(`${environment.baseUrl}api/faq/admin`, data);
    }

    fetchOneFaq(id: number): Observable<IFaq> {
        return this.httpClient.get<IFaq>(`${environment.baseUrl}api/faq/admin/${id}`);
    }

    updateFaq(data: IFaq): Observable<IFaq> {
        return this.httpClient.put<IFaq>(`${environment.baseUrl}api/faq/admin/${data.id}`, data);
    }
}
