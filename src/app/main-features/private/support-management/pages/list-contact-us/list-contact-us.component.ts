import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IContactUsState } from '../../store/state/support.state';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IContactUs } from '../../../../../shared/models/contact-us.model';
import { Subject, takeUntil } from 'rxjs';
import { selectorContactUs } from '../../store/selectors/support.selectors';
import { loadListContactUs } from '../../store/actions/contact-us.actions';

@Component({
    selector: 'app-list-contact-us',
    templateUrl: './list-contact-us.component.html',
    styleUrls: ['./list-contact-us.component.scss'],
})
export class ListContactUsComponent implements OnInit, OnDestroy {
    store = inject(Store<IContactUsState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listContactUs = signal<IContactUs[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();
    sizePage = 5;

    ngOnInit(): void {
        this.store
            .select(selectorContactUs)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IContactUsState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListContactUs({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listContactUs.set(result.entities.slice());
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
            loadListContactUs({
                page: newPage,
                size: 5,
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
