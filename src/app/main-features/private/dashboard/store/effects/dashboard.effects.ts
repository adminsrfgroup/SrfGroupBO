import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogService } from '../../services/log.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadListLog, loadListLogFailure, loadListLogSuccess } from '../actions/log.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardStatService } from '../../services/dashboard-stat.service';
import { loadListMetrics, loadMetricsFailure, loadMetricsSuccess } from '../actions/metrics.actions';
import { IMetrics } from '../../../../../shared/models/metrics.model';

@Injectable()
export class DashboardEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private dashboardStatService: DashboardStatService
    ) {}

    fetchListMetrics$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListMetrics.type),
            switchMap(() => {
                return this.dashboardStatService.fetchAllMetrics().pipe(
                    map((data: IMetrics[]) => {
                        return loadMetricsSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadMetricsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchListLog$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListLog.type),
            switchMap(() => {
                return this.logService.fetchAllLog().pipe(
                    map((data: any) => {
                        return loadListLogSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadListLogFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
