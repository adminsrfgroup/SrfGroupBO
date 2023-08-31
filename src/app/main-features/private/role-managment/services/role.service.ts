import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IAuthority } from '../../../../shared/models/authority.model';
import { PageCommon } from '../../../../shared/models/page.common';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    constructor(private httpClient: HttpClient) {}

    fetchAllRoles(page: number, size: number): Observable<PageCommon<IAuthority>> {
        return this.httpClient.get<PageCommon<IAuthority>>(`${environment.baseUrl}api/authority/admin?page=${page}&size=${size}`);
    }

    fetchOneRole(id: number): Observable<IAuthority> {
        return this.httpClient.get<IAuthority>(`${environment.baseUrl}api/authority/admin/${id}`);
    }

    updateRole(data: IAuthority): Observable<IAuthority> {
        return this.httpClient.put<IAuthority>(`${environment.baseUrl}api/authority/admin/${data.id}`, data);
    }
}
