import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFaqState } from '../../store/state/support.state';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { selectorFaq } from '../../store/selectors/support.selectors';
import { IFaq } from '../../../../../shared/models/faq.model';
import { loadListFaq } from '../../store/actions/faq.actions';

@Component({
    selector: 'app-list-faq',
    templateUrl: './list-faq.component.html',
    styleUrls: ['./list-faq.component.scss'],
})
export class ListFaqComponent implements OnInit, OnDestroy {
    store = inject(Store<IFaqState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];

    listFaq: WritableSignal<IFaq[]> = signal<IFaq[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    sizePage = 5;

    ngOnInit(): void {
        this.store
            .select(selectorFaq)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IFaqState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListFaq({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listFaq.set(result.entities.slice());
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
            loadListFaq({
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
