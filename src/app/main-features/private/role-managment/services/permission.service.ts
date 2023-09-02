import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IPermission } from '../../../../shared/models/permission.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {
    constructor(private httpClient: HttpClient) {}
    addPermission(data: IPermission): Observable<IPermission> {
        return this.httpClient.post<IPermission>(`${environment.baseUrl}api/permission/admin/create`, data);
    }

    fetchPermissions(page: number, size: number): Observable<PageCommon<IPermission>> {
        return this.httpClient.get<PageCommon<IPermission>>(`${environment.baseUrl}api/permission/admin?page=${page}&size=${size}`);
    }
}
