import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IContactUs } from '../../../../shared/models/contact-us.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class SupportService {
    constructor(private httpClient: HttpClient) {}

    fetchAllContactUs(page: number, size: number): Observable<PageCommon<IContactUs>> {
        return this.httpClient.get<PageCommon<IContactUs>>(`${environment.baseUrl}api/contactus/admin/list?page=${page}&size=${size}`);
    }
}
