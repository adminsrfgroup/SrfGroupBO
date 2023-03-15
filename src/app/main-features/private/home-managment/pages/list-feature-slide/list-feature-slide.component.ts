import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { Store } from '@ngrx/store';
import { HomeState, IFeatureHome } from '../../store/state/init.state';
import { selectorFeatureHome} from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { fetchFeatureSlides, resetFeatureSlide } from '../../store/actions/feature-home.actions';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";

@Component({
    selector: 'app-list-feature-slide',
    templateUrl: './list-feature-slide.component.html',
    styleUrls: ['./list-feature-slide.component.scss']
})
export class ListFeatureSlideComponent implements OnInit, OnDestroy {
    listFeatureSlides: IPostHomeFeature[] = [];
    selectedFeatureSlides!: IPostHomeFeature[];
    loading: boolean = false;
    totalItems: number = 0;
    totalPages: number = 0;
    // @ViewChild('dt') table!: Table;
    representatives!: any[];
    statuses!: any[];
    destroy$: Subject<boolean> = new Subject<boolean>();




    title = 'app1';
    displayedColumns: string[] = ['id', 'descriptionAr', 'descriptionFr', 'descriptionEn', 'image', 'action'];
    dataSource: any;
    empdata: any;

    @ViewChild(MatPaginator) paginator !: MatPaginator;
    @ViewChild(MatSort) sort !: MatSort;



  constructor(private store: Store<HomeState>, private dialog: MatDialog) {}

    ngOnInit() {
        this.store
            .select(selectorFeatureHome)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IFeatureHome) => {
                    console.log('result ', result);
                    if (!result.entities.length && result.totalPages === -1) {
                        this.store.dispatch(fetchFeatureSlides());
                    } else {
                        this.listFeatureSlides = result.entities.slice();
                        this.totalItems = result.totalItems;
                        this.totalPages = result.totalPages;
                        this.loading = result.loadingEntities;


                        this.empdata = result.entities.slice();

                        this.dataSource = new MatTableDataSource(this.empdata)
                        this.dataSource.paginator = this.paginator;
                        this.dataSource.sort = this.sort;
                    }

                    if (result.deleteSuccess) {
                        this.store.dispatch(resetFeatureSlide());
                    }
                },
            });
    }

    Filterchange(event: Event) {
      const filvalue = (event.target as HTMLInputElement).value;
      console.log('filvalue ', filvalue)
      this.dataSource.filter = filvalue;
    }

    FunctionEdit(code: any) {
      this.OpenDialog('1000ms','600ms',code)
    }

    FunctionDelete(code: any) {


    }

    getrow(row: any) {
      //console.log(row);
    }

    OpenDialog(enteranimation: any, exitanimation: any,code:any) {


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

    onActivityChange(event: any) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
              // this.table.filter(activity, 'activity', 'gte');
            }
        }
    }

    deleteSlide(id: number) {}

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
