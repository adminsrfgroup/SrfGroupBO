import { Injectable } from '@angular/core';
import { LoginState } from '../state/login.state';
import { Store } from '@ngrx/store';
import {loginAction, resetLoginAction} from '../actions/login.action';
import {selectorTokenLogin} from '../selectors/login.selectors';
import { Observable } from 'rxjs';
import { ILogin } from '../../models/login.model';

@Injectable({
    providedIn: 'root',
})
export class LoginFacadeService {
    constructor(private store: Store<LoginState>) {}

    login(user: ILogin): void {
        this.store.dispatch(loginAction(user));
    }

    fetchToken(): Observable<any> {
        return this.store.select(selectorTokenLogin);
    }

    resetLogin(): void{
      this.store.dispatch(resetLoginAction());
    }
}
