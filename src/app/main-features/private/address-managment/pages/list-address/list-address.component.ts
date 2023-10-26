import {Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { PrimeNGConfig } from 'primeng/api';
import { AddressState } from '../../store/state/init.state';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { selectorAddress } from '../../store/serlectors/address.selector';
import { importAddress, loadListAddress } from '../../store/actions/address.action';
import { IAddress } from '../../../../../shared/models/address.model';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-list-address',
    templateUrl: './list-address.component.html',
    styleUrls: ['./list-address.component.scss'],
})
export class ListAddressComponent implements OnInit {
    store = inject(Store<AddressState>);
    primengConfig = inject(PrimeNGConfig);
    @ViewChild('dt') table!: Table;
    statuses!: any[];
    representatives!: any[];
    listAddress: IAddress[] = [];
    loading = false;
    totalElements = 0;
    totalPages = 0;

    sizePage = 5;

    destroyRef = inject(DestroyRef);

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
            .select(selectorAddress)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (result: AddressState) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        // this.store.dispatch(
                        //     loadListAddress({
                        //         page: 0,
                        //         size: 5,
                        //     })
                        // );
                    } else if (result.entities.length) {
                        this.listAddress = result.entities.slice();
                        this.totalElements = result.totalElements;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }
                },
            });
    }

    importAddress(): void {
        this.store.dispatch(importAddress());
    }

    onActivityChange(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onRepresentativeChange(event: MultiSelectChangeEvent): void {
        this.table.filter(event.value, 'representative', 'in');
    }

    filter(event: Event, filed: string, matchMode: string): void {
        this.table.filter((event.target as HTMLInputElement).value, filed, matchMode);
    }

    nextPage(event: TableLazyLoadEvent): void {
        const newPage: number = Math.trunc(Number(event.first) / this.sizePage);
        this.store.dispatch(
            loadListAddress({
                page: newPage,
                size: this.sizePage,
            })
        );
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }
}
