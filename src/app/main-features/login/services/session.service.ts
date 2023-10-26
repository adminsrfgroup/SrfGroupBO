import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SessionState } from '../store/state/session.state';
import { selectorSession } from '../store/selectors/session.selectors';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    storeSession = inject(Store<SessionState>);

    isAuthenticated(): Observable<boolean> {
        return new Observable(observer => {
            this.storeSession.select(selectorSession).subscribe({
                next: (response: SessionState) => {
                    observer.next(response?.isAuthenticated);
                },
                error: err => {
                    observer.error(err);
                },
            });
        });
    }
}
