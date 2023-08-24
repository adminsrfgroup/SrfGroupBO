import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    constructor(private httpClient: HttpClient) {}

    fetchAllLog(): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}api/management/loggers`);
    }
}
