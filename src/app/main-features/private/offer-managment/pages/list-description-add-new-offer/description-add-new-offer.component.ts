import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../category-managment/store/state/init.state';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { selectorDescriptionAddNewOffer } from '../../store/selectors/offer.selectors';
import { IDescriptionNewOfferState } from '../../store/state/offer.state';
import { loadListDescriptionNewOffer } from '../../store/actions/offer.actions';

@Component({
    selector: 'app-description-add-new-offer',
    templateUrl: './description-add-new-offer.component.html',
    styleUrls: ['./description-add-new-offer.component.scss'],
})
export class DescriptionAddNewOfferComponent implements OnInit, OnDestroy {
    store = inject(Store<IDescriptionNewOfferState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];

    listDescriptionAddNewOffer: WritableSignal<IDescriptionAddOffer[]> = signal<IDescriptionAddOffer[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

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
            .select(selectorDescriptionAddNewOffer)
            .pipe(takeUntil(this.destroy$))
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

    nextPage(event: LazyLoadEvent): void {
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
