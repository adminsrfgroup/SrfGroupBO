import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageService } from '../../shared/services/storage.service';
import { AllAppConfig } from '../index';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SessionState } from '../../main-features/login/store/state/session.state';
import { logoutAction } from '../../main-features/login/store/actions/session.action';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router, private storeSession: Store<SessionState>) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthToken(request)).pipe(
            tap({
                next: () => {},
                error: (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status !== 401) {
                            return;
                        }
                        this.storeSession.dispatch(logoutAction());
                    }
                },
            })
        );
    }

    addAuthToken(request: HttpRequest<any>) :  HttpRequest<any>{
        return request.clone({
            setHeaders: {
                Authorization: `Bearer ${StorageService.local.get(AllAppConfig.NAME_TOKEN_CURRENT_USER)}`,
                sourceConnectedDevice: `WEB_BROWSER`,
                langKey: `fr`,
            },
        });
    }
}
