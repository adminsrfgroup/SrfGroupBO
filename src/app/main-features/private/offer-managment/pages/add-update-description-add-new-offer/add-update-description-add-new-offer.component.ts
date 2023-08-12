import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {IDescriptionAddOffer} from "../../../../../shared/models/description-add-offer.model";
import {selectorDescriptionAddNewOffer} from "../../store/selectors/offer.selectors";
import {Subject, takeUntil} from "rxjs";
import {IDescriptionNewOfferState} from "../../store/state/offer.state";
import {Store} from "@ngrx/store";
import {CategoryState} from "../../../category-managment/store/state/init.state";
import {resetTopSlide} from "../../../home-managment/store/actions/home.actions";
import {Router} from "@angular/router";
import {addDescriptionNewOffer} from "../../store/actions/offer.actions";

@Component({
  selector: 'app-add-update-description-add-new-offer',
  templateUrl: './add-update-description-add-new-offer.component.html',
  styleUrls: ['./add-update-description-add-new-offer.component.scss']
})
export class AddUpdateDescriptionAddNewOfferComponent implements OnInit, OnDestroy{

  store = inject(Store<CategoryState>);
  router = inject(Router);
  descriptionAddNewOffer = signal<IDescriptionAddOffer>({});
  idEntity = signal<Number>(-1);

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {

    this.store
      .select(selectorDescriptionAddNewOffer)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: IDescriptionNewOfferState) => {
          console.log('result ', result);

          if (result.addSuccess || result.updateSuccess) {
            this.store.dispatch(resetTopSlide());
            this.router.navigate(['private/offer/description-add-new-offer']).then();
          }

          if (this.idEntity() && result.entity) {
            this.descriptionAddNewOffer.set({
              descriptionAr: result.entity.descriptionAr,
              descriptionFr: result.entity.descriptionFr,
              descriptionEn: result.entity.descriptionEn
            })
          }
        },
      });
  }

  addUpdateDescNewOffer(){
    const requestData: IDescriptionAddOffer = {
      descriptionAr: this.descriptionAddNewOffer().descriptionAr,
      descriptionFr: this.descriptionAddNewOffer().descriptionFr,
      descriptionEn: this.descriptionAddNewOffer().descriptionEn,
    };

    this.store.dispatch(addDescriptionNewOffer(requestData));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
