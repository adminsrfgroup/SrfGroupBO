import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, of, switchMap} from "rxjs";
import {OfferService} from "../../services/offer.service";
import {loadListOffers, loadListOffersFailure, loadListOffersSuccess} from "../actions/offer.actions";
import {Pagination} from "../../../../../shared/models/page.common";

@Injectable()
export class OfferEffects {
  constructor(private actions$: Actions, private offerService: OfferService) {
  }

  fetchListUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadListOffers.type),
      switchMap((payload: Pagination) => {
        return this.offerService.fetchAllOffers(payload.page, payload.size).pipe(
          map((data: any) => {
            return loadListOffersSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(loadListOffersFailure({ error: exception.error }));
          })
        );
      })
    )
  );
}
