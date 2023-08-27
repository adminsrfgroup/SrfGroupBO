import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsLetter } from '../../../../shared/models/newsletter.model';
import { environment } from '../../../../../environments/environment';
import { ICgu } from '../../../../shared/models/cgu.model';

@Injectable({
    providedIn: 'root',
})
export class CguService {
    constructor(private httpClient: HttpClient) {}

    fetchCgu(): Observable<ICgu> {
        return this.httpClient.get<ICgu>(`${environment.baseUrl}api/cgu/public`);
    }

    addCgu(data: ICgu): Observable<ICgu> {
        return this.httpClient.post<ICgu>(`${environment.baseUrl}api/cgu/admin/create`, data);
    }

    updateCgu(data: ICgu): Observable<ICgu> {
        return this.httpClient.put<ICgu>(`${environment.baseUrl}api/cgu/admin/update/${data.id}`, data);
    }
}
