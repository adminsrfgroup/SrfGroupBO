import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITopHomeSlidesImages } from '../../../../shared/models/top-home-slides-images.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IPostHomeFeature } from '../../../../shared/models/post-home-feature.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class FeatureHomeService {
    constructor(private httpClient: HttpClient) {}

    addFeatureSlide(data: IPostHomeFeature): Observable<IPostHomeFeature> {
        return this.httpClient.post(`${environment.baseUrl}api/post-home-feature/admin/create`, data);
    }

    fetchFeatureSlide(): Observable<PageCommon<IPostHomeFeature>> {
        return this.httpClient.get<PageCommon<IPostHomeFeature>>(`${environment.baseUrl}api/post-home-feature/admin/list`);
    }
}
