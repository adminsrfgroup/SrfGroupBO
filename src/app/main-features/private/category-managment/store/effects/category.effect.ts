import { inject, Injectable } from '@angular/core';
import { AddressService } from '../../../address-managment/services/address.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadListAddress, loadListAddressFailure, loadListAddressSuccess } from '../../../address-managment/store/actions/address.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import {
    fetchOneCategory,
    fetchOneCategoryFailure,
    fetchOneCategorySuccess,
    importCategories,
    importCategoriesFailure,
    importCategoriesSuccess,
    loadListCategories,
    loadListCategoriesFailure,
    loadListCategoriesSuccess,
    updateCategory,
    updateCategoryFailure,
    updateCategorySuccess,
} from '../actions/category.action';
import { CategoryService } from '../../services/category.service';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { fetchOneAboutUsFailure, fetchOneAboutUsSuccess } from '../../../support-management/store/actions/about-us.actions';
import { ICategory } from '../../../../../shared/models/category.model';
import { updateCgu, updateCguFailure, updateCguSuccess } from '../../../support-management/store/actions/cgu.actions';
import { ICgu } from '../../../../../shared/models/cgu.model';

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

    importCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(importCategories.type),
            switchMap(() => {
                return this.categoryService.importCategories().pipe(
                    map((data: string) => {
                        return importCategoriesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(importCategoriesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchOneCategory = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOneCategory.type),
            switchMap((payload: IdEntity) => {
                return this.categoryService.fetchOneCategory(payload.id).pipe(
                    map((data: ICategory) => {
                        return fetchOneCategorySuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchOneCategoryFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateCgu$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCategory.type),
            switchMap((payload: ICategory) => {
                return this.categoryService.updateCategory(payload).pipe(
                    map((data: any) => {
                        return updateCategorySuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(updateCategoryFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
