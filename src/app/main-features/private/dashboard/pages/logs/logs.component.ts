import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IFaqState } from '../../../support-management/store/state/support.state';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IFaq } from '../../../../../shared/models/faq.model';
import { Subject, takeUntil } from 'rxjs';
import { ILogState } from '../../store/state/dashboard.state';
import { selectorFaq } from '../../../support-management/store/selectors/support.selectors';
import { loadListFaq } from '../../../support-management/store/actions/faq.actions';
import { loadListLog } from '../../store/actions/log.actions';
import { selectorLog } from '../../store/selectors/dashboard.selectors';

@Component({
    selector: 'app-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
    store = inject(Store<ILogState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];

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
}
