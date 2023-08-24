import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { IAboutUsState } from '../../store/state/support.state';
import { selectorRole } from '../../../role-managment/store/selectors/role.selectors';
import { IRoleAuthority } from '../../../role-managment/store/state/init.state';
import { loadListRoles } from '../../../role-managment/store/actions/role.action';
import { loadListAboutUs } from '../../store/actions/about-us.actions';
import { selectorAbouttUs } from '../../store/selectors/support.selectors';

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

    ngOnInit() {
        this.store
            .select(selectorAbouttUs)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IAboutUsState) => {
                    console.log('result ', result);
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListAboutUs({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listAboutUs.set(result.entities.slice());
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
