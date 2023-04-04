import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private httpClient: HttpClient) { }

  fetchAllOffers(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/offer/public?page=${page}&size=${size}`);
  }
}
