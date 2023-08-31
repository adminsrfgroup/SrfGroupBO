import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { IMainOfferState, IOfferState } from '../../store/state/offer.state';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IOffer } from '../../../../../shared/models/offer.model';
import { loadListOffers, resetListOffers } from '../../store/actions/offer.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectorOffers } from '../../store/selectors/offer.selectors';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { AllAppConfig } from '../../../../../config';
@Component({
    selector: 'app-list-offer',
    templateUrl: './list-offer.component.html',
    styleUrls: ['./list-offer.component.scss'],
})
export class ListOfferComponent implements OnInit, OnDestroy {
  
    selectedOffers!: any[];
    representatives!: any[];
    listOffers: WritableSignal<IOffer[]> = signal<IOffer[]>([]);
    loadListOffers: WritableSignal<IOffer[]> = signal<IOffer[]>([]);
    @ViewChild('dt') table!: Table;
    statuses!: any[];

    destroy$: Subject<boolean> = new Subject<boolean>();

    store = inject(Store<IMainOfferState>);
    primengConfig = inject(PrimeNGConfig);

    // sizePage = 5;

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    sizePage: WritableSignal<number> = signal<number>(AllAppConfig.OFFER_MODULE.ITEMS_PER_PAGINATION);
    newPage: WritableSignal<number> = signal<number>(0);
    isFirstLoading: WritableSignal<boolean> = signal<boolean>(true);
    currentIndex: WritableSignal<number> = signal<number>(0);

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
                    if (this.isFirstLoading() && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListOffers({
                                page: this.newPage(),
                                size: this.sizePage(),
                            })
                        );
                    } else if (result.entities.length) {
                        this.loadListOffers.set(result.entities.slice(this.newPage() * this.sizePage(), result.entities.length));
                        this.listOffers.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    nextPage(event: TableLazyLoadEvent): void {
        if (!this.isFirstLoading()) {
            this.newPage.set(Math.trunc(Number(event.first) / this.sizePage()));
            if (this.newPage() * this.sizePage() >= this.listOffers().length) {
                // New step
                if (this.newPage() === this.currentIndex() + 1) {
                    this.currentIndex.set(this.newPage());
                    this.store.dispatch(
                        loadListOffers({
                            page: this.newPage(),
                            size: this.sizePage(),
                        })
                    );
                } else {
                    // Jump of many steps
                    this.store.dispatch(resetListOffers());
                    this.store.dispatch(
                        loadListOffers({
                            page: 0,
                            size: (this.newPage() + 1) * this.sizePage(),
                        })
                    );
                }
            } else {
                this.loadListOffers.set(this.listOffers().slice(this.newPage() * this.sizePage(), this.listOffers().length));
            }
        } else {
            this.isFirstLoading.set(false);
        }
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

    onRepresentativeChange(event: MultiSelectChangeEvent): void {
        this.table.filter(event.value, 'representative', 'in');
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
