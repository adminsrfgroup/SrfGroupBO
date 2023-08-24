import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IAboutUs } from '../../../../shared/models/about-us.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class AboutUsService {
    constructor(private httpClient: HttpClient) {}

    addAboutUs(data: IAboutUs): Observable<IAboutUs> {
        return this.httpClient.post<IAboutUs>(`${environment.baseUrl}api/aboutus/admin`, data);
    }

    fetchAllAboutUs(page: number, size: number): Observable<PageCommon<IAboutUs>> {
        return this.httpClient.get<any>(`${environment.baseUrl}api/aboutus/admin?page=${page}&size=${size}`);
    }

    fetchOneAboutUs(id: number): Observable<IAboutUs> {
        return this.httpClient.get<IAboutUs>(`${environment.baseUrl}api/aboutus/admin/${id}`);
    }
}
