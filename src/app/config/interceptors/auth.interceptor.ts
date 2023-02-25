import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { AllAppConfig } from '../index';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request));
    }

    addAuthToken(request: HttpRequest<any>) {
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)}`,
                sourceConnectedDevice: `WebBrowser`,
                langKey: `fr`,
            },
        });
    }
}
