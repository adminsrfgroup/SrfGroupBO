import { Component, OnInit, signal, ViewChild, ViewEncapsulation, WritableSignal } from '@angular/core';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/state/user.state';
import { loadListUsers } from '../../store/actions/list-user.actions';
import { IUser } from '../../../../../shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
import { selectorUser } from '../../store/selectors/user.selectors';
import { AllAppConfig } from '../../../../../config';
import { resetCategories } from '../../../category-managment/store/actions/category.action';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListUsersComponent implements OnInit {
    selectedCustomers = [];

    representatives = [];

    statuses = [];

    listUsers: WritableSignal<IUser[]> = signal<IUser[]>([]);
    loadListUsers: WritableSignal<IUser[]> = signal<IUser[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    sizePage: WritableSignal<number> = signal<number>(AllAppConfig.USER_MODULE.ITEMS_PER_PAGINATION);
    newPage: WritableSignal<number> = signal<number>(0);

    isFirstLoading: WritableSignal<boolean> = signal<boolean>(true);
    currentIndex: WritableSignal<number> = signal<number>(0);

    @ViewChild('dt') table!: Table;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private primengConfig: PrimeNGConfig,
        private store: Store<UserState>
    ) {}

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        this.store
            .select(selectorUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: UserState) => {
                    if (this.isFirstLoading() && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListUsers({
                                page: this.newPage(),
                                size: this.sizePage(),
                            })
                        );
                    } else if (result.entities.length) {
                        this.loadListUsers.set(result.entities.slice(this.newPage() * this.sizePage(), result.entities.length));
                        this.listUsers.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    nextPage(event: TableLazyLoadEvent): void {
        if (!this.isFirstLoading()) {
            this.newPage.set(Math.trunc(Number(event.first) / this.sizePage()));
            if (this.newPage() * this.sizePage() >= this.listUsers().length) {
                // New step
                if (this.newPage() === this.currentIndex() + 1) {
                    this.currentIndex.set(this.newPage());
                    this.store.dispatch(
                        loadListUsers({
                            page: this.newPage(),
                            size: this.sizePage(),
                        })
                    );
                } else {
                    // Jump of many steps
                    this.store.dispatch(resetCategories());
                    this.store.dispatch(
                        loadListUsers({
                            page: 0,
                            size: (this.newPage() + 1) * this.sizePage(),
                        })
                    );
                }
            } else {
                this.loadListUsers.set(this.listUsers().slice(this.newPage() * this.sizePage(), this.listUsers().length));
            }
        } else {
            this.isFirstLoading.set(false);
        }
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
