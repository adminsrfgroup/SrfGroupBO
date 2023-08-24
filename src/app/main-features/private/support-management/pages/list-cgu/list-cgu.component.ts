import {Component, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {Store} from "@ngrx/store";
import {ICguState, IFaqState} from "../../store/state/support.state";
import {LazyLoadEvent, PrimeNGConfig} from "primeng/api";
import {Table} from "primeng/table";
import {IFaq} from "../../../../../shared/models/faq.model";
import {Subject, takeUntil} from "rxjs";
import {selectorCgu, selectorFaq} from "../../store/selectors/support.selectors";
import {loadListFaq} from "../../store/actions/faq.actions";
import {defaultValue, ICgu} from "../../../../../shared/models/cgu.model";
import {loadListCgu} from "../../store/actions/cgu.actions";

@Component({
    selector: 'app-list-cgu',
    templateUrl: './list-cgu.component.html',
    styleUrls: ['./list-cgu.component.scss'],
})
export class ListCguComponent  implements OnInit, OnDestroy {
  store = inject(Store<ICguState>);
  primengConfig = inject(PrimeNGConfig);
  @ViewChild('dt') table!: Table;
  statuses!: any[];
  representatives!: any[];

  listCgu: WritableSignal<ICgu[]>  = signal<ICgu[]>([]);

  loading = signal<boolean>(false);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.store
      .select(selectorCgu)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: ICguState) => {
          console.log('result ', result);
          if (!result?.entity?.id && !result?.loading && result?.errorMessage==null) {
            this.store.dispatch(
              loadListCgu()
            );
          } else  {
            let tmpValues = [];
            tmpValues.push(result.entity);
            this.listCgu.set(tmpValues.slice());
            this.loading.set(result.loading);
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
