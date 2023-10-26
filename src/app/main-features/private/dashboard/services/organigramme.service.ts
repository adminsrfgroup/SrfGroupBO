import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IOrganigramme } from '../../../../shared/models/organigramme.model';

@Injectable({
    providedIn: 'root',
})
export class OrganigrammeService {
    constructor(private httpClient: HttpClient) {}

    fetchOrganigramme(): Observable<IOrganigramme> {
        return this.httpClient.get<IOrganigramme>(`${environment.baseUrl}api/administration/organigramme`);
    }

    addOrganigramme(payload: IOrganigramme): Observable<IOrganigramme> {
        return this.httpClient.post<IOrganigramme>(`${environment.baseUrl}api/administration/organigramme`, payload);
    }
    updateOrganigramme(payload: IOrganigramme): Observable<IOrganigramme> {
        return this.httpClient.put<IOrganigramme>(`${environment.baseUrl}api/administration/organigramme/${payload.id}`, payload);
    }
}
