import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SessionState } from '../state/session.state';
import { logoutAction, sessionAction } from '../actions/session.action';
// import { selectorCurrentSession, selectorIsAuthenticatedSession } from '../selectors/session.selectors';
// import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SessionFacadeService {
    constructor(private store: Store<SessionState>) {}

    // fetchCurrentSession(): void {
    //     this.store.dispatch(sessionAction());
    // }

    // currentSession(): Observable<SessionState> {
    //     return this.store.select(selectorCurrentSession);
    // }
    //
    // isAuthenticated(): Observable<boolean> {
    //     return this.store.select(selectorIsAuthenticatedSession);
    // }

    // logout(): void {
    //     this.store.dispatch(logoutAction());
    // }
}
