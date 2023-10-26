import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { IAuthority } from '../../../../../shared/models/authority.model';
import { loadListRoles } from '../../store/actions/role.action';
import { IRoleAuthority, RoleState } from '../../store/state/init.state';
import { selectorRole } from '../../store/selectors/role.selectors';
import { EAuthority } from '../../../../../shared/constants/authorities';
import { protectedDefaultAuthorities } from '../../../../../shared/utils/utils-functions';

@Component({
    selector: 'app-list-role',
    templateUrl: './list-role.component.html',
    styleUrls: ['./list-role.component.scss'],
})
export class ListRoleComponent implements OnInit, OnDestroy {
    store = inject(Store<RoleState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses = [];
    representatives = [];

    listRole: WritableSignal<IAuthority[]> = signal<IAuthority[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    sizePage = 5;

    isFirstLoading: WritableSignal<boolean> = signal<boolean>(true);

    ngOnInit(): void {
        this.store
            .select(selectorRole)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IRoleAuthority) => {
                    // if (result.entities.length === 0 && result.totalPages === -1) {
                    if (this.isFirstLoading() && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListRoles({
                                page: 0,
                                size: this.sizePage,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listRole.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    nextPage(event: TableLazyLoadEvent): void {
        if (!this.isFirstLoading()) {
            const newPage: number = Math.trunc(Number(event.first) / this.sizePage);
            this.store.dispatch(
                loadListRoles({
                    page: newPage,
                    size: this.sizePage,
                })
            );
            // } else {
            this.isFirstLoading.set(false);
        }
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }

    isEditableProtectedAuthority(authority: IAuthority): boolean {
        return protectedDefaultAuthorities(authority);
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
