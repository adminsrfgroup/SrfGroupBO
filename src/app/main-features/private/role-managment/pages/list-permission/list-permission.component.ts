import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IRolePermission } from '../../store/state/init.state';
import { Subject, takeUntil } from 'rxjs';
import { IPermission } from '../../../../../shared/models/permission.model';
import { loadListPermissions } from '../../store/actions/permission.action';
import { selectorPermission } from '../../store/selectors/role.selectors';

@Component({
    selector: 'app-list-permission',
    templateUrl: './list-permission.component.html',
    styleUrls: ['./list-permission.component.scss'],
})
export class ListPermissionComponent implements OnInit, OnDestroy {
    store = inject(Store<IRolePermission>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;

    statuses = [];
    representatives = [];
    listPermissions: WritableSignal<IPermission[]> = signal<IPermission[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    sizePage = 5;

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.store
            .select(selectorPermission)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IRolePermission) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListPermissions({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listPermissions.set(result.entities.slice());
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
            loadListPermissions({
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
