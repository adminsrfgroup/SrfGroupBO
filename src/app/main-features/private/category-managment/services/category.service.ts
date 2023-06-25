import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {PageCommon} from "../../../../shared/models/page.common";
import {ICategory} from "../../../../shared/models/category.model";

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    httpClient = inject(HttpClient);
    fetchAllCategories(page: number, size: number): Observable<PageCommon<ICategory>> {
        return this.httpClient.get<PageCommon<ICategory>>(`${environment.baseUrl}api/category/public?page=${page}&size=${size}`);
    }
}
