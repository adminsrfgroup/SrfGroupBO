import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {INewsLetter} from "../../../../shared/models/newsletter.model";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private httpClient: HttpClient) {}

  fetchAllNewsLetter(page: number, size: number): Observable<INewsLetter> {
    return this.httpClient.get<any>(`${environment.baseUrl}api/news-letter/admin/list?page=${page}&size=${size}`);
  }
}
