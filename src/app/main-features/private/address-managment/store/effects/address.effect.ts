import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OfferService } from '../../../offer-managment/services/offer.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import {
  importAddress, importAddressFailure, importAddressSuccess,
  loadListAddress,
  loadListAddressFailure,
  loadListAddressSuccess
} from '../actions/address.action';
import { AddressService } from '../../services/address.service';

@Injectable()
export class AddressEffects {
    addressService = inject(AddressService);

    constructor(private actions$: Actions) {}

    fetchListAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListAddress.type),
            switchMap((payload: Pagination) => {
                return this.addressService.fetchAllAddress(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListAddressSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListAddressFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

  importAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(importAddress.type),
      switchMap((payload: string) => {
        return this.addressService.importAddress().pipe(
          map((data: any) => {
            return importAddressSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(importAddressFailure({ error: exception.error }));
          })
        );
      })
    )
  );
}
