import { Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { CategoryState } from '../../../category-managment/store/state/init.state';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { IRolePermission, RoleState } from '../../store/state/init.state';
import { Subject, takeUntil } from 'rxjs';
import { IDescriptionAddOffer } from '../../../../../shared/models/description-add-offer.model';
import { IPermission } from '../../../../../shared/models/permission.model';
import { selectorDescriptionAddNewOffer } from '../../../offer-managment/store/selectors/offer.selectors';
import { IDescriptionNewOfferState } from '../../../offer-managment/store/state/offer.state';
import { loadListDescriptionNewOffer } from '../../../offer-managment/store/actions/offer.actions';
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

    statuses!: any[];
    representatives!: any[];
    listPermissions: WritableSignal<IPermission[]> = signal<IPermission[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    destroy$: Subject<boolean> = new Subject<boolean>();

    sizePage = 5;

    ngOnInit(): void {
        this.representatives = [
            { name: 'Amy Elsner', image: 'amyelsner.png' },
            { name: 'Anna Fali', image: 'annafali.png' },
            { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
            { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
            { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
            { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
            { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
            { name: 'Onyama Limba', image: 'onyamalimba.png' },
            { name: 'Stephen Shaw', image: 'stephenshaw.png' },
            { name: 'XuXue Feng', image: 'xuxuefeng.png' },
        ];

        this.statuses = [
            { label: 'Unqualified', value: 'unqualified' },
            { label: 'Qualified', value: 'qualified' },
            { label: 'New', value: 'new' },
            { label: 'Negotiation', value: 'negotiation' },
            { label: 'Renewal', value: 'renewal' },
            { label: 'Proposal', value: 'proposal' },
        ];
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
