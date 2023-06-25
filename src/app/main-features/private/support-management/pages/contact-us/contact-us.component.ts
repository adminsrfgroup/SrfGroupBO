import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { SupportState } from '../../store/state/support.state';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();

    store = inject(Store<SupportState>);
    primengConfig = inject(PrimeNGConfig);

    ngOnInit() {
        // this.store
        //   .select(selectorContactUs)
        //   .pipe(takeUntil(this.destroy$))
        //   .subscribe({
        //     next: (result: OfferState) => {
        //       console.log('result ', result);
        //       if (result.entities.length===0 && result.totalPages===-1) {
        //         this.store.dispatch(loadListContactUs({
        //           page: 0,
        //           size: 5
        //         }));
        //       }
        //     }});
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
