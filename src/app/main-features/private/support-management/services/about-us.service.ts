import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {IAboutUs} from "../../../../shared/models/about-us.model";

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(private httpClient: HttpClient) {}

  addAboutUs(data: IAboutUs): Observable<IAboutUs> {
    return this.httpClient.post<IAboutUs>(`${environment.baseUrl}api/aboutus/admin`, data);
  }

  fetchAllAboutUs(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/aboutus/admin?page=${page}&size=${size}`);
  }

}
