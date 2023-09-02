import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { OfferService } from '../../services/offer.service';
import {
    addDescriptionNewOffer,
    addDescriptionNewOfferFailure,
    addDescriptionNewOfferSuccess,
    loadListDescriptionNewOffer,
    loadListDescriptionNewOfferFailure,
    loadListDescriptionNewOfferSuccess,
    loadListOffers,
    loadListOffersFailure,
    loadListOffersSuccess,
} from '../actions/offer.actions';
import { PageCommon, Pagination } from '../../../../../shared/models/page.common';
import { DescriptionOfferService } from '../../services/description-offer.service';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IOffer } from '../../../../../shared/models/offer.model';

@Injectable()
export class OfferEffects {
    descriptionOfferService = inject(DescriptionOfferService);

    constructor(
        private actions$: Actions,
        private offerService: OfferService
    ) {}

    fetchListOffers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListOffers.type),
            switchMap((payload: Pagination) => {
                return this.offerService.fetchAllOffers(payload.page, payload.size).pipe(
                    map((data: PageCommon<IOffer>) => {
                        return loadListOffersSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadListOffersFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchListDescriptionNewOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListDescriptionNewOffer.type),
            switchMap((payload: Pagination) => {
                return this.descriptionOfferService.fetchDescriptionOffers(payload.page, payload.size).pipe(
                    map((data: PageCommon<IDescriptionAddOffer>) => {
                        return loadListDescriptionNewOfferSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadListDescriptionNewOfferFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addDescriptionNewOffer$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addDescriptionNewOffer.type),
            switchMap((payload: IDescriptionAddOffer) => {
                return this.descriptionOfferService.addDescriptionOffers(payload).pipe(
                    map((data: IDescriptionAddOffer) => {
                        return addDescriptionNewOfferSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(addDescriptionNewOfferFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
