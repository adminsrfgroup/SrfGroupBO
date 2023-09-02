import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { ILogState } from '../../store/state/dashboard.state';
import { loadListLog } from '../../store/actions/log.actions';
import { selectorLog } from '../../store/selectors/dashboard.selectors';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit, OnDestroy {
    store = inject(Store<ILogState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listLog = signal<any>([]);

    loading = signal<boolean>(false);

    destroy$: Subject<boolean> = new Subject<boolean>();
    ngOnInit(): void {
        this.store
            .select(selectorLog)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: any) => {
                    if (Object.keys(result.entities).length === 0 && !result.loadingEntities) {
                        this.store.dispatch(loadListLog());
                    } else if (Object.keys(result.entities).length) {
                        this.loading.set(result.loadingEntities);
                        const loggers = Object.entries(result.entities.loggers).map((item: any) => {
                            return { name: item[0], level: item[1].effectiveLevel };
                        });
                        this.listLog.set(loggers.slice());
                    }
                },
            });
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
