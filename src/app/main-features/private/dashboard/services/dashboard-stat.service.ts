import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class DashboardStatService {
    constructor(private httpClient: HttpClient) {}

    fetchAllMetrics(): Observable<any> {
        return this.httpClient.get<any>(`${environment.baseUrl}api/monitoring/admin/metrics`);
    }
}
