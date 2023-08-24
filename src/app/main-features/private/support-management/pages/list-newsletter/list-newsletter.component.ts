import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { INewsLetterState } from '../../store/state/support.state';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
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
    statuses!: any[];
    representatives!: any[];

    listNewsLetter = signal<INewsLetter[]>([]);

    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    ngOnInit() {
        this.store
            .select(selectorNewsLetter)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: INewsLetterState) => {
                    console.log('result ', result);
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListNewsLetter({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listNewsLetter.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    nextPage(event: LazyLoadEvent) {
        console.log('event ', event);
    }

    filterGlobal(event: any, matchMode: string) {
        this.table.filterGlobal(event.target.value, matchMode);
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
