import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { CategoryState } from '../../store/state/init.state';
import { selectorCategory } from '../../store/selectors/category.selector';
import { loadListCategories } from '../../store/actions/category.action';
import { ICategory } from '../../../../../shared/models/category.model';

@Component({
    selector: 'app-list-category',
    templateUrl: './list-category.component.html',
    styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit, OnDestroy {
    store = inject(Store<CategoryState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];

    destroy$: Subject<boolean> = new Subject<boolean>();

    listCategories = signal<ICategory[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    ngOnInit() {
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
            .select(selectorCategory)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: CategoryState) => {
                    console.log('result ', result);
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListCategories({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else {
                        this.listCategories.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    importAddress(): void {}

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

    nextPage(event: LazyLoadEvent) {
        console.log('event ', event);

        // this.store.dispatch(setActivePageOffers({
        //   page: 1,
        //   size: 5
        // }));
    }

    filterGlobal(event: any, matchMode: string) {
        this.table.filterGlobal(event.target.value, matchMode);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
