import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HomeState, ITopSlides } from '../../store/state/init.state';
import { Store } from '@ngrx/store';
import { selectorTopSlides } from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { deleteTopSlides, fetchTopSlides, resetTopSlide } from '../../store/actions/home.actions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';

@Component({
    selector: 'app-top-slide',
    templateUrl: './top-slide.component.html',
    styleUrls: ['./top-slide.component.scss'],
})
export class TopSlideComponent implements OnInit, OnDestroy {
    listTopSlides: ITopHomeSlidesImages[] = [];
    selectedTopSlides!: ITopHomeSlidesImages[];

    loading: boolean = false;
    totalItems: number = 0;
    totalPages: number = 0;
    // @ViewChild('dt') table!: Table;
    representatives!: any[];
    statuses!: any[];

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<HomeState>) {}

    ngOnInit() {
        this.store
            .select(selectorTopSlides)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: ITopSlides) => {
                    console.log('result ', result);
                    if (!result.entities.length && result.totalPages === -1) {
                        this.store.dispatch(fetchTopSlides());
                    } else {
                        this.listTopSlides = result.entities.slice();
                        this.totalItems = result.totalItems;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;
                    }

                    if (result.deleteSuccess) {
                        this.store.dispatch(resetTopSlide());
                    }
                },
            });
    }

    onActivityChange(event: any) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                // this.table.filter(activity, 'activity', 'gte');
            }
        }
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

    onDateSelect(value: any) {
        // this.table.filter(this.formatDate(value), 'date', 'equals');
    }

    onRepresentativeChange(event: any) {
        // this.table.filter(event.value, 'representative', 'in');
    }

    filter(event: any, filed: string, matchMode: string) {
        // this.table.filter(event.target?.value, filed, matchMode);
    }

    filterGlobal(event: any, matchMode: string) {
        // this.table.filterGlobal(event.target.value, matchMode);
    }

    deleteSlide(id: number) {
        // this.confirmationService.confirm({
        //     message: 'Do you want to delete this record?',
        //     header: 'Delete Confirmation',
        //     icon: 'pi pi-info-circle',
        //     accept: () => {
        //         this.store.dispatch(deleteTopSlides({ id: id }));
        //     },
        //     reject: () => {},
        // });
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
