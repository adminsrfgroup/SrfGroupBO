import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  fetchAllRoles(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/authority/admin?page=${page}&size=${size}`);
  }
}
