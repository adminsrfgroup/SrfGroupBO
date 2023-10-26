import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LogService } from '../../services/log.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadListLog, loadListLogFailure, loadListLogSuccess } from '../actions/log.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { DashboardStatService } from '../../services/dashboard-stat.service';
import { loadListMetrics, loadMetricsFailure, loadMetricsSuccess } from '../actions/metrics.actions';
import { IMetrics } from '../../../../../shared/models/metrics.model';
import { OrganigrammeService } from '../../services/organigramme.service';
import { IOrganigramme } from '../../../../../shared/models/organigramme.model';
import {
    addOrganigramme,
    addOrganigrammeFailure,
    addOrganigrammeSuccess,
    loadOrganigramme,
    loadOrganigrammeFailure,
    loadOrganigrammeSuccess,
    updateOrganigramme,
    updateOrganigrammeFailure,
    updateOrganigrammeSuccess,
} from '../actions/organigramme.actions';

@Injectable()
export class DashboardEffects {
    constructor(
        private actions$: Actions,
        private logService: LogService,
        private dashboardStatService: DashboardStatService,
        private organigrammeService: OrganigrammeService
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

    fetchOrganigramme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadOrganigramme.type),
            switchMap(() => {
                return this.organigrammeService.fetchOrganigramme().pipe(
                    map((data: IOrganigramme) => {
                        return loadOrganigrammeSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadOrganigrammeFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addOrganigramme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addOrganigramme.type),
            switchMap((payload: IOrganigramme) => {
                return this.organigrammeService.addOrganigramme(payload).pipe(
                    map((data: IOrganigramme) => {
                        return addOrganigrammeSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(addOrganigrammeFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateOrganigramme$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOrganigramme.type),
            switchMap((payload: IOrganigramme) => {
                return this.organigrammeService.updateOrganigramme(payload).pipe(
                    map((data: IOrganigramme) => {
                        return updateOrganigrammeSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(updateOrganigrammeFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
