import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { IMainOfferState, IOfferState } from '../../store/state/offer.state';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IOffer } from '../../../../../shared/models/offer.model';
import { loadListOffers, resetListOffers } from '../../store/actions/offer.actions';
import { selectorOffers } from '../../store/selectors/offer.selectors';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { AllAppConfig } from '../../../../../config';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
    selector: 'app-list-offer',
    templateUrl: './list-offer.component.html',
    styleUrls: ['./list-offer.component.scss'],
})
export class ListOfferComponent implements OnInit {
    selectedOffers = [];
    representatives = [];
    listOffers: WritableSignal<IOffer[]> = signal<IOffer[]>([]);
    loadListOffers: WritableSignal<IOffer[]> = signal<IOffer[]>([]);
    @ViewChild('dt') table!: Table;
    statuses = [];

    private readonly store = inject(Store<IMainOfferState>);
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
        this.primengConfig.ripple = true;

        this.store
            .select(selectorOffers)
            .pipe(takeUntilDestroyed())
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
}
