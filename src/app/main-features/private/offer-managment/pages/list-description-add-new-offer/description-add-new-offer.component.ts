import { Component, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { selectorDescriptionAddNewOffer } from '../../store/selectors/offer.selectors';
import { IDescriptionNewOfferState } from '../../store/state/offer.state';
import { loadListDescriptionNewOffer } from '../../store/actions/offer.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-description-add-new-offer',
    templateUrl: './description-add-new-offer.component.html',
    styleUrls: ['./description-add-new-offer.component.scss'],
})
export class DescriptionAddNewOfferComponent implements OnInit {
    private readonly store = inject(Store<IDescriptionNewOfferState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listDescriptionAddNewOffer: WritableSignal<IDescriptionAddOffer[]> = signal<IDescriptionAddOffer[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    sizePage = 5;

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.store
            .select(selectorDescriptionAddNewOffer)
            .pipe(takeUntilDestroyed())
            .subscribe({
                next: (result: IDescriptionNewOfferState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListDescriptionNewOffer({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listDescriptionAddNewOffer.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    nextPage(event: TableLazyLoadEvent): void {
        const newPage: number = Math.trunc(Number(event.first) / this.sizePage);
        this.store.dispatch(
            loadListDescriptionNewOffer({
                page: newPage,
                size: this.sizePage,
            })
        );
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }
}
