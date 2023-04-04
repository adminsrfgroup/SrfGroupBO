import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private httpClient: HttpClient) { }

  fetchAllContactUs(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/contactus/admin/list?page=${page}&size=${size}`);
  }
}
