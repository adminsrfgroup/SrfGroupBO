import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMetricsState } from '../../store/state/dashboard.state';
import { Subject, takeUntil } from 'rxjs';
import { selectorDashboardStat } from '../../store/selectors/dashboard.selectors';
import { loadListMetrics } from '../../store/actions/metrics.actions';

@Component({
    selector: 'app-metrics',
    templateUrl: './metrics.component.html',
    styleUrls: ['./metrics.component.scss'],
})
export class MetricsComponent implements OnInit, OnDestroy {
    store = inject(Store<IMetricsState>);
    destroy$: Subject<boolean> = new Subject<boolean>();

    listMetrics = signal<any>([]);

    loadingEntities = signal<boolean>(false);

    ngOnInit(): void {
        this.store
            .select(selectorDashboardStat)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IMetricsState) => {
                    if (result.entities.length === 0 && result.totalElements === -1) {
                        this.store.dispatch(loadListMetrics());
                    } else if (result.entities.length) {
                        this.listMetrics.set(result.entities.slice());
                        this.loadingEntities.set(result.loadingEntities);
                    }
                },
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
