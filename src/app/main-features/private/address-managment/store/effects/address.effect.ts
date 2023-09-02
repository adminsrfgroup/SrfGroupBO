import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { importAddress, importAddressFailure, importAddressSuccess, loadListAddress, loadListAddressFailure, loadListAddressSuccess } from '../actions/address.action';
import { AddressService } from '../../services/address.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAddress } from '../../../../../shared/models/address.model';

@Injectable()
export class AddressEffects {
    addressService = inject(AddressService);

    constructor(private actions$: Actions) {}

    fetchListAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListAddress.type),
            switchMap((payload: Pagination) => {
                return this.addressService.fetchAllAddress(payload.page, payload.size).pipe(
                    map((data: PageCommon<IAddress>) => {
                        return loadListAddressSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadListAddressFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    importAddress$ = createEffect(() =>
        this.actions$.pipe(
            ofType(importAddress.type),
            switchMap(() => {
                return this.addressService.importAddress().pipe(
                    map((data: string) => {
                        return importAddressSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(importAddressFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
