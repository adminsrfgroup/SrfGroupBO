import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogService } from '../../services/log.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadListLog, loadListLogFailure, loadListLogSuccess } from '../actions/log.actions';

@Injectable()
export class DashboardEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService
    ) {}

    fetchListLog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListLog.type),
            switchMap(() => {
                return this.logService.fetchAllLog().pipe(
                    map((data: any) => {
                        return loadListLogSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListLogFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
