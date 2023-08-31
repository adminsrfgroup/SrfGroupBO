import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { CategoryState } from '../../store/state/init.state';
import { selectorCategory } from '../../store/selectors/category.selector';
import { importCategories, loadListCategories, resetCategories } from '../../store/actions/category.action';
import { ICategory } from '../../../../../shared/models/category.model';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { AllAppConfig } from '../../../../../config';

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

    listCategories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
    loadListCategories: WritableSignal<ICategory[]> = signal<ICategory[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    sizePage: WritableSignal<number> = signal<number>(AllAppConfig.CATEGORY_MODULE.ITEMS_PER_PAGINATION);
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
            .select(selectorCategory)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: CategoryState) => {
                    // if (result.entities.length === 0 && result.totalPages === -1) {
                    if (this.isFirstLoading() && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListCategories({
                                page: this.newPage(),
                                size: this.sizePage(),
                            })
                        );
                    } else if (result.entities.length) {
                        this.loadListCategories.set(result.entities.slice(this.newPage() * this.sizePage(), result.entities.length));
                        this.listCategories.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    importCategories(): void {
        this.store.dispatch(importCategories());
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

    nextPage(event: TableLazyLoadEvent): void {
        if (!this.isFirstLoading()) {
            this.newPage.set(Math.trunc(Number(event.first) / this.sizePage()));
            if (this.newPage() * this.sizePage() >= this.listCategories().length) {
                // New step
                if (this.newPage() === this.currentIndex() + 1) {
                    this.currentIndex.set(this.newPage());
                    this.store.dispatch(
                        loadListCategories({
                            page: this.newPage(),
                            size: this.sizePage(),
                        })
                    );
                } else {
                    // Jump of many steps
                    this.store.dispatch(resetCategories());
                    this.store.dispatch(
                        loadListCategories({
                            page: 0,
                            size: (this.newPage() + 1) * this.sizePage(),
                        })
                    );
                }
            } else {
                this.loadListCategories.set(this.listCategories().slice(this.newPage() * this.sizePage(), this.listCategories().length));
            }
        } else {
            this.isFirstLoading.set(false);
        }
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
