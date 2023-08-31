import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeState, ITopSlides } from '../../store/state/init.state';
import { Store } from '@ngrx/store';
import { selectorTopSlides } from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { deleteTopSlides, fetchTopSlides, resetTopSlide } from '../../store/actions/home.actions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { Table, TableLazyLoadEvent } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { MultiSelectChangeEvent } from 'primeng/multiselect';
@Component({
    selector: 'app-top-slide',
    templateUrl: './top-slide.component.html',
    styleUrls: ['./top-slide.component.scss'],
    providers: [ConfirmationService],
})
export class TopSlideComponent implements OnInit, OnDestroy {
    listTopSlides: ITopHomeSlidesImages[] = [];
    selectedTopSlides!: ITopHomeSlidesImages[];

    loading = false;
    totalItems = 0;
    totalPages = 0;
    @ViewChild('dt') table!: Table;
    representatives!: any[];
    statuses!: any[];

    idDeleteSlide!: number;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private store: Store<HomeState>,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.store
            .select(selectorTopSlides)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: ITopSlides) => {
                    if (!result.entities.length && result.totalPages === -1) {
                        this.store.dispatch(fetchTopSlides());
                    } else {
                        this.listTopSlides = result.entities.slice();
                        this.totalItems = result.totalItems;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }

                    if (result.deleteSuccess) {
                        this.confirmationService.close();
                        this.store.dispatch(resetTopSlide());
                    }
                },
            });
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

    formatDate(date: Date): string {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        let monthValue = '';
        let dayValue = '';

        if (month < 10) {
            monthValue = '0' + month;
        }

        if (day < 10) {
            dayValue = '0' + day;
        }

        return date.getFullYear() + '-' + monthValue + '-' + dayValue;
    }

    onDateSelect(value: Date): void {
        this.table.filter(this.formatDate(value), 'date', 'equals');
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

    deleteSlide(id: number): void {
        this.idDeleteSlide = id;
        this.confirmationService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
        });
    }

    acceptDelete(): void {
        this.store.dispatch(deleteTopSlides({ id: this.idDeleteSlide }));
    }

    rejectDelete(): void {
        this.confirmationService.close();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
