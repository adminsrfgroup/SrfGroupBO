import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { IAboutUsState } from '../../store/state/support.state';
import { loadListAboutUs } from '../../store/actions/about-us.actions';
import { selectorAboutUs } from '../../store/selectors/support.selectors';

@Component({
    selector: 'app-list-about-us',
    templateUrl: './list-about-us.component.html',
    styleUrls: ['./list-about-us.component.scss'],
})
export class ListAboutUsComponent implements OnInit, OnDestroy {
    store = inject(Store<IAboutUsState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];

    listAboutUs = signal<IAboutUs[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    sizePage = 5;

    ngOnInit(): void {
        this.store
            .select(selectorAboutUs)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IAboutUsState) => {
                    if (result.entities.length) {
                        this.listAboutUs.set(result.entities.slice());
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
            loadListAboutUs({
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
