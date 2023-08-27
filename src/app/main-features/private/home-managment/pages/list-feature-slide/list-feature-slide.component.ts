import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { Table } from 'primeng/table';
import { ConfirmationService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { HomeState, IFeatureHome } from '../../store/state/init.state';
import { selectorFeatureHome } from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { deleteFeatureSlide, fetchFeatureSlides, resetFeatureSlide } from '../../store/actions/feature-home.actions';

@Component({
    selector: 'app-list-feature-slide',
    templateUrl: './list-feature-slide.component.html',
    styleUrls: ['./list-feature-slide.component.scss'],
    providers: [ConfirmationService],
})
export class ListFeatureSlideComponent implements OnInit, OnDestroy {
    listFeatureSlides: IPostHomeFeature[] = [];
    selectedFeatureSlides!: IPostHomeFeature[];
    loading = false;
    totalItems = 0;
    totalPages = 0;
    @ViewChild('dt') table!: Table;
    representatives!: any[];
    statuses!: any[];

    idDeleteFeature!: number;
    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<HomeState>, private confirmationService: ConfirmationService) {}

    ngOnInit(): void {
        this.store
            .select(selectorFeatureHome)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IFeatureHome) => {
                    if (!result.entities.length && result.totalPages === -1) {
                        this.store.dispatch(fetchFeatureSlides());
                    } else {
                        this.listFeatureSlides = result.entities.slice();
                        this.totalItems = result.totalItems;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }

                    if (result.deleteSuccess) {
                        this.confirmationService.close();
                        this.store.dispatch(resetFeatureSlide());
                    }
                },
            });
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

    onRepresentativeChange(event: Event): void {
        this.table.filter((event.target as HTMLInputElement).value, 'representative', 'in');
    }

    filter(event: Event, filed: string, matchMode: string): void {
        this.table.filter((event.target as HTMLInputElement).value, filed, matchMode);
    }

    filterGlobal(event: Event, matchMode: string): void {
        this.table.filterGlobal((event.target as HTMLInputElement).value, matchMode);
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

    deleteSlide(id: number): void {
        this.idDeleteFeature = id;
        this.confirmationService.confirm({
            message: 'Do you want to delete this feature?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
        });
    }

    acceptDelete(): void {
        this.store.dispatch(deleteFeatureSlide({ id: this.idDeleteFeature }));
    }

    rejectDelete(): void {
        this.confirmationService.close();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
