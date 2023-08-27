import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { PageCommon } from '../../../../shared/models/page.common';
import { ICategory } from '../../../../shared/models/category.model';
@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    httpClient = inject(HttpClient);
    fetchAllCategories(page: number, size: number): Observable<PageCommon<ICategory>> {
        return this.httpClient.get<PageCommon<ICategory>>(`${environment.baseUrl}api/category/public?page=${page}&size=${size}`);
    }

    importCategories(): Observable<string> {
        return this.httpClient.get<string>(`${environment.baseUrl}api/category/admin/import`);
    }

    fetchOneCategory(id: number): Observable<ICategory> {
        return this.httpClient.get<ICategory>(`${environment.baseUrl}api/category/admin/${id}`);
    }

    updateCategory(data: ICategory): Observable<ICategory> {
        return this.httpClient.put<ICategory>(`${environment.baseUrl}api/category/admin/update/${data.id}`, data);
    }
}
