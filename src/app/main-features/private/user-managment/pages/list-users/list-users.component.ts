import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/state/user.state';
import { loadListUsers } from '../../store/actions/list-user.actions';
import { selectorEntitiesUser, selectorLoadingUser, selectorTotalElementsUser, selectorTotalPagesUser } from '../../store/selectors/list-user.selectors';
import { IUser } from '../../../../../shared/models/user.model';

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

    constructor(private primengConfig: PrimeNGConfig, private store: Store<UserState>) {}

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

        this.store.select(selectorTotalPagesUser).subscribe({
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

    dispatchAllUsers() {
        this.store.dispatch(loadListUsers());
    }

    onActivityChange(event: any) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    onDateSelect(value: any) {
        this.table.filter(this.formatDate(value), 'date', 'equals');
    }

    formatDate(date: any) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }

    onRepresentativeChange(event: any) {
        this.table.filter(event.value, 'representative', 'in');
    }

    filter(event: any, filed: string, matchMode: string) {
        this.table.filter(event.target?.value, filed, matchMode);
    }

    filterGlobal(event: any, matchMode: string) {
        this.table.filterGlobal(event.target.value, matchMode);
    }
}
