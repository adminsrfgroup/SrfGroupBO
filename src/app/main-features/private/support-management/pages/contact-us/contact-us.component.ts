import {Component, OnDestroy, OnInit} from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {Store} from "@ngrx/store";
import {SupportState} from "../../store/state/support.state";
import {selectorOffers} from "../../../offer-managment/store/selectors/offer.selectors";
import {Subject, takeUntil} from "rxjs";
import {OfferState} from "../../../offer-managment/store/state/offer.state";
import {loadListOffers} from "../../../offer-managment/store/actions/offer.actions";
import {loadListContactUs} from "../../store/actions/contact-us.actions";
import {selectorContactUs} from "../../store/selectors/support.selectors";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy{

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private primengConfig: PrimeNGConfig, private store: Store<SupportState>) {

  }

  ngOnInit() {

    this.store
      .select(selectorContactUs)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: OfferState) => {
          console.log('result ', result);
          if (result.entities.length===0 && result.totalPages===-1) {
            this.store.dispatch(loadListContactUs({
              page: 0,
              size: 5
            }));
          }
        }});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
