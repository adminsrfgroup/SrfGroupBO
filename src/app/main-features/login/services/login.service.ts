import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ILogin, IResponseLogin } from '../models/login.model';
import { Observable } from 'rxjs';
import { IUser } from '../../../shared/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private httpClient: HttpClient) {}

    login(user: ILogin): Observable<IResponseLogin> {
        return this.httpClient.post<IResponseLogin>(`${environment.baseUrl}api/user/public/signin`, user);
    }

    session(): Observable<IUser> {
        return this.httpClient.get<IUser>(`${environment.baseUrl}api/user/current-user`);
    }
}
