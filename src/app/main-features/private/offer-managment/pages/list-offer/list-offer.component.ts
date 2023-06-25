import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { OfferState } from '../../store/state/offer.state';
import { Table } from 'primeng/table';
import { IOffer } from '../../../../../shared/models/offer.model';
import { loadListOffers } from '../../store/actions/offer.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectorOffers } from '../../store/selectors/offer.selectors';
@Component({
    selector: 'app-list-offer',
    templateUrl: './list-offer.component.html',
    styleUrls: ['./list-offer.component.scss'],
})
export class ListOfferComponent implements OnInit, OnDestroy {
    loading = false;
    totalElements = 0;
    totalPages = 0;

    selectedOffers!: any[];
    representatives!: any[];
    listOffers: IOffer[] = [];
    @ViewChild('dt') table!: Table;
    statuses!: any[];

    destroy$: Subject<boolean> = new Subject<boolean>();

    store = inject(Store<OfferState>);
    primengConfig = inject(PrimeNGConfig);

    ngOnInit(): void {
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' },
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' },
        ];
        this.primengConfig.ripple = true;

        this.store
            .select(selectorOffers)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: OfferState) => {
                    console.log('result ', result);
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListOffers({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else {
                        this.listOffers = result.entities.slice();
                        this.totalElements = result.totalElements;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }
                    /*
            if (result.deleteSuccess) {
              this.confirmationService.close();
              this.store.dispatch(resetTopSlide());
            }
            */
                },
            });
    }

    nextPage(event: LazyLoadEvent) {
        console.log('event ', event);

        // this.store.dispatch(setActivePageOffers({
        //   page: 1,
        //   size: 5
        // }));
    }

    onActivityChange(event: any) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onRepresentativeChange(event: any) {
        this.table.filter(event.value, 'representative', 'in');
    }

    filter(event: any, filed: string, matchMode: string) {
        this.table.filter(event.target?.value, filed, matchMode);
    }

    filterGlobal(event: any, matchMode: string) {
        this.table.filterGlobal(event.target.value, matchMode);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
