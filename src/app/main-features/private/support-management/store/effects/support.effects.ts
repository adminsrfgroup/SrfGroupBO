import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import { SupportService } from '../../services/support.service';
import { loadListContactUs, loadListContactUsFailure, loadListContactUsSuccess } from '../actions/contact-us.actions';
import {AboutUsService} from "../../services/about-us.service";
import {IAboutUs} from "../../../../../shared/models/about-us.model";
import {
  addAboutUs,
  addAboutUsFailure,
  addAboutUsSuccess,
  loadListAboutUs, loadListAboutUsFailure,
  loadListAboutUsSuccess
} from "../actions/about-us.actions";

@Injectable()
export class SupportEffects {
    constructor(private actions$: Actions, private supportService: SupportService,
                private aboutUsService: AboutUsService) {}

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


  addAboutUs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAboutUs.type),
      switchMap((payload: IAboutUs) => {
        return this.aboutUsService.addAboutUs(payload).pipe(
          map((data: any) => {
            return addAboutUsSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(addAboutUsFailure({ error: exception.error }));
          })
        );
      })
    )
  );


  fetchAllboutUs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListAboutUs.type),
      switchMap((payload: Pagination) => {
        return this.aboutUsService.fetchAllAboutUs(payload.page, payload.size).pipe(
          map((data: any) => {
            return loadListAboutUsSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(loadListAboutUsFailure({ error: exception.error }));
          })
        );
      })
    )
  );
}
