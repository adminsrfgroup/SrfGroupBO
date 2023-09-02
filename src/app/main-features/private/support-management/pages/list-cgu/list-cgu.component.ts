import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICguState } from '../../store/state/support.state';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { selectorCgu } from '../../store/selectors/support.selectors';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { loadListCgu } from '../../store/actions/cgu.actions';

@Component({
    selector: 'app-list-cgu',
    templateUrl: './list-cgu.component.html',
    styleUrls: ['./list-cgu.component.scss'],
})
export class ListCguComponent implements OnInit, OnDestroy {
    store = inject(Store<ICguState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listCgu: WritableSignal<ICgu[]> = signal<ICgu[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnInit(): void {
        this.store
            .select(selectorCgu)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: ICguState) => {
                    if (!result?.entity?.id && !result?.loading && result?.errorMessage == null) {
                        // this.store.dispatch(loadListCgu());
                    } else {
                        const tmpValues = [];
                        tmpValues.push(result.entity);
                        this.listCgu.set(tmpValues.slice());
                        this.loading.set(result.loading);
                    }
                },
            });
    }

    nextPage(): void {
        this.store.dispatch(loadListCgu());
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
