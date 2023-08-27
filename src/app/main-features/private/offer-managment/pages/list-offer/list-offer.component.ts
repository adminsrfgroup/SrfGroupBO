import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { IMainOfferState, IOfferState } from '../../store/state/offer.state';
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

    store = inject(Store<IMainOfferState>);
    primengConfig = inject(PrimeNGConfig);

    sizePage = 5;

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
                next: (result: IOfferState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListOffers({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listOffers = result.entities.slice();
                        this.totalElements = result.totalElements;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }
                },
            });
    }

    nextPage(event: LazyLoadEvent): void {
        const newPage: number = Math.trunc(Number(event.first) / this.sizePage);
        this.store.dispatch(
            loadListOffers({
                page: newPage,
                size: this.sizePage,
            })
        );
    }

    onActivityChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onRepresentativeChange(event: Event): void {
        this.table.filter((event.target as HTMLInputElement).value, 'representative', 'in');
    }

    filter(event: Event, filed: string, matchMode: string): void {
        this.table.filter((event.target as HTMLInputElement).value, filed, matchMode);
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
