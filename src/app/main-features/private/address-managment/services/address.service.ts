import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AddressService {
    httpClient = inject(HttpClient);
    fetchAllAddress(page: number, size: number): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}api/address/public?page=${page}&size=${size}`);
    }

    importAddress(): Observable<string> {
        return this.httpClient.get<string>(`${environment.baseUrl}api/address/admin/import`);
    }
}
