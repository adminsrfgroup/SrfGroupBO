import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/state/user.state';
import { loadListUsers } from '../../store/actions/list-user.actions';
import { selectorEntitiesUser, selectorLoadingUser, selectorTotalElementsUser, selectorTotalPagesUser } from '../../store/selectors/list-user.selectors';
import { IUser } from '../../../../../shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListUsersComponent implements OnInit {
    selectedCustomers!: any[];

    representatives!: any[];

    statuses!: any[];

    listUsers: IUser[] = [];
    loading = false;
    totalElements = 0;
    totalPages = 0;

    @ViewChild('dt') table!: Table;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private primengConfig: PrimeNGConfig,
        private store: Store<UserState>
    ) {}

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
            .select(selectorTotalPagesUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: number) => {
                    this.totalPages = result;
                },
            });
        this.store.select(selectorTotalElementsUser).subscribe({
            next: (result: number) => {
                this.totalElements = result;
            },
        });
        this.store.select(selectorLoadingUser).subscribe({
            next: (result: boolean) => {
                this.loading = result;
            },
        });
        this.store.select(selectorEntitiesUser).subscribe({
            next: (result: IUser[]) => {
                if (!result.length) {
                    this.dispatchAllUsers();
                } else {
                    this.listUsers = result.slice();
                }
            },
        });
    }

    dispatchAllUsers(): void {
        this.store.dispatch(loadListUsers());
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

    onDateSelect(value: Date): void {
        this.table.filter(this.formatDate(value), 'date', 'equals');
    }

    formatDate(date: Date): string {
        const month = date.getMonth() + 1;
        let monthValue = '';
        let dayValue = '';
        const day = date.getDate();

        if (month < 10) {
            monthValue = '0' + month;
        }

        if (day < 10) {
            dayValue = '0' + day;
        }

        return date.getFullYear() + '-' + monthValue + '-' + dayValue;
    }

    onRepresentativeChange(event: MultiSelectChangeEvent): void {
        this.table.filter(event.value, 'representative', 'in');
    }

    filter(event: Event, filed: string, matchMode: string): void {
        this.table.filter((event.target as HTMLInputElement).value, filed, matchMode);
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
    }
}
