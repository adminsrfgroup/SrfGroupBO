import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { PageCommon } from '../../../../shared/models/page.common';
import { IUser } from '../../../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ListUsersService {
    constructor(private httpClient: HttpClient) {}

    fetchAllUsers(): Observable<PageCommon<IUser>> {
        return this.httpClient.get<PageCommon<IUser>>(`${environment.baseUrl}api/user/admin/list-users`);
    }

    fetchDetailsUser(id: number): Observable<IUser> {
        return this.httpClient.get(`${environment.baseUrl}api/user/admin/profile/${id}`);
    }

    blockedUnblockedUser(id: number, blockUnblock: string): Observable<{ blockUnblock: string }> {
        return this.httpClient.post<{ blockUnblock: string }>(`${environment.baseUrl}api/user/blocked-user/${id}`, { blockUnblock: blockUnblock });
    }
}
