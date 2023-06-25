import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import { SupportService } from '../../services/support.service';
import { loadListContactUs, loadListContactUsFailure, loadListContactUsSuccess } from '../actions/contact-us.actions';

@Injectable()
export class SupportEffects {
    constructor(private actions$: Actions, private supportService: SupportService) {}

    fetchListContactUs$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListContactUs.type),
            switchMap((payload: Pagination) => {
                return this.supportService.fetchAllContactUs(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListContactUsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListContactUsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
