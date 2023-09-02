import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { INewsLetterState } from '../../store/state/support.state';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { selectorNewsLetter } from '../../store/selectors/support.selectors';
import { INewsLetter } from '../../../../../shared/models/newsletter.model';
import { loadListNewsLetter } from '../../store/actions/newsletter.actions';

@Component({
    selector: 'app-list-newsletter',
    templateUrl: './list-newsletter.component.html',
    styleUrls: ['./list-newsletter.component.scss'],
})
export class ListNewsletterComponent implements OnInit, OnDestroy {
    store = inject(Store<INewsLetterState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listNewsLetter = signal<INewsLetter[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();
    sizePage = 5;

    ngOnInit(): void {
        this.store
            .select(selectorNewsLetter)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: INewsLetterState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListNewsLetter({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listNewsLetter.set(result.entities.slice());
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
            loadListNewsLetter({
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
