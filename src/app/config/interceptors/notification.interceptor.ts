import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap({
                next: (event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        const headers = event.headers.keys();
                        let alert: string | null = '';
                        Object.entries<string>(headers).forEach(([k, v]) => {
                            if (v.toLowerCase().endsWith('app-alert')) {
                                alert = event.headers.get(v);
                            }
                        });

                        if (alert) {
                            this.messageService.add({ severity: 'success', summary: alert, detail: '' });
                        }
                    }
                },
                error: (err: HttpErrorResponse) => {
                    this.messageService.add({ severity: 'error', summary: 'Service Message', detail: err.error });
                },
            })
        );
    }
}
