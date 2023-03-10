import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ITopHomeSlidesImages } from '../../../../shared/models/top-home-slides-images.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    constructor(private httpClient: HttpClient) {}

    addTopSlide(data: ITopHomeSlidesImages): Observable<ITopHomeSlidesImages> {
        return this.httpClient.post(`${environment.baseUrl}api/top-home-slides-images/admin/create`, data);
    }

    fetchTopSlide(): Observable<PageCommon<ITopHomeSlidesImages>> {
        return this.httpClient.get<PageCommon<ITopHomeSlidesImages>>(`${environment.baseUrl}api/top-home-slides-images/admin/slides`);
    }

    fetchOneTopSlide(id: number): Observable<ITopHomeSlidesImages> {
        return this.httpClient.get<ITopHomeSlidesImages>(`${environment.baseUrl}api/top-home-slides-images/admin/${id}`);
    }

    updateTopSlide(data: ITopHomeSlidesImages): Observable<ITopHomeSlidesImages> {
        return this.httpClient.put(`${environment.baseUrl}api/top-home-slides-images/admin/update/${data.id}`, data);
    }

    deleteTopSlide(id: number): Observable<boolean> {
        return this.httpClient.delete<boolean>(`${environment.baseUrl}api/top-home-slides-images/admin/${id}`);
    }
}
