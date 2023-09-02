import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loginAction, loginActionFailure, loginActionSuccess } from '../actions/login.action';
import { sessionAction, sessionActionFailure, sessionActionSuccess } from '../actions/session.action';
import { ILogin, IResponseLogin } from '../../models/login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../../../shared/models/user.model';

@Injectable()
export class LoginEffects {
    constructor(
        private actions$: Actions,
        private loginService: LoginService
    ) {}

    loginUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loginAction.type),
            switchMap((payload: ILogin) => {
                return this.loginService.login(payload).pipe(
                    map((data: IResponseLogin) => {
                        if (data.error) {
                            return loginActionFailure({ error: data.error });
                        }
                        return loginActionSuccess({
                            payload: {
                                token: data.token,
                                refreshToken: data.refreshToken,
                            },
                        });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loginActionFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    sessionUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(sessionAction.type),
            switchMap(() => {
                return this.loginService.session().pipe(
                    map((data: IUser) => {
                        return sessionActionSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(sessionActionFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
