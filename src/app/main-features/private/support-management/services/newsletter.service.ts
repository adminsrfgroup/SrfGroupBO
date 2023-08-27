import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { INewsLetter } from '../../../../shared/models/newsletter.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class NewsletterService {
    constructor(private httpClient: HttpClient) {}

    fetchAllNewsLetter(page: number, size: number): Observable<PageCommon<INewsLetter>> {
        return this.httpClient.get<PageCommon<INewsLetter>>(`${environment.baseUrl}api/news-letter/admin/list?page=${page}&size=${size}`);
    }
}
