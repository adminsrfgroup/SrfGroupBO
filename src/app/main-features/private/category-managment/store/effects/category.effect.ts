import { inject, Injectable } from '@angular/core';
import { AddressService } from '../../../address-managment/services/address.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadListAddress, loadListAddressFailure, loadListAddressSuccess } from '../../../address-managment/store/actions/address.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import { loadListCategories, loadListCategoriesFailure, loadListCategoriesSuccess } from '../actions/category.action';
import { CategoryService } from '../../services/category.service';

@Injectable()
export class CategoryEffects {
    categoryService = inject(CategoryService);

    constructor(private actions$: Actions) {}

    fetchListCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListCategories.type),
            switchMap((payload: Pagination) => {
                return this.categoryService.fetchAllCategories(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListCategoriesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListCategoriesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
