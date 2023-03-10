import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { PageCommon } from '../../../../shared/models/page.common';
import { ITopHomeSlidesImages } from '../../../../shared/models/top-home-slides-images.model';
import { IUser } from '../../../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class ListUsersService {
    constructor(private httpClient: HttpClient) {}

    fetchAllUsers(): Observable<PageCommon<IUser>> {
        return this.httpClient.get<PageCommon<IUser>>(`${environment.baseUrl}api/user/admin/list-users`);
    }
}
