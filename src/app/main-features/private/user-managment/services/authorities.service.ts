import { Injectable } from '@angular/core';
import { UpdateUserAuthorities } from '../models/update-user-authorities';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {IAuthority} from "../../../../shared/models/authority.model";

@Injectable({
    providedIn: 'root',
})
export class AuthoritiesService {
    constructor(private httpClient: HttpClient) {}

    updateUserAuthorities(data: UpdateUserAuthorities): Observable<IAuthority[]> {
        return this.httpClient.put<IAuthority[]>(`${environment.baseUrl}api/authority/user-authority/${data.userId}`, data);
    }
}
