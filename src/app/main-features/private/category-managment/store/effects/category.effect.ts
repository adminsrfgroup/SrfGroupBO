import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
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
import { ICategory } from '../../../../../shared/models/category.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CategoryEffects {
    categoryService = inject(CategoryService);

    constructor(private actions$: Actions) {}

    fetchListCategories$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListCategories.type),
            switchMap((payload: Pagination) => {
                return this.categoryService.fetchAllCategories(payload.page, payload.size).pipe(
                    map((data: PageCommon<ICategory>) => {
                        return loadListCategoriesSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
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
                    catchError((exception: HttpErrorResponse) => {
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
                    catchError((exception: HttpErrorResponse) => {
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
                    map((data: ICategory) => {
                        return updateCategorySuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(updateCategoryFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
