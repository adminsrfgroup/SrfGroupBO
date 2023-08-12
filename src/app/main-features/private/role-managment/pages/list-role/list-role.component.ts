import {Component, inject, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {LazyLoadEvent, PrimeNGConfig} from "primeng/api";
import {Table} from "primeng/table";
import {Subject, takeUntil} from "rxjs";
import {IAuthority} from "../../../../../shared/models/authority.model";
import {loadListRoles} from "../../store/actions/role.action";
import {IRoleAuthority, RoleState} from "../../store/state/init.state";
import {selectorRole} from "../../store/selectors/role.selectors";

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.scss']
})
export class ListRoleComponent implements OnInit, OnDestroy{
  store = inject(Store<RoleState>);
  primengConfig = inject(PrimeNGConfig);
  @ViewChild('dt') table!: Table;
  statuses!: any[];
  representatives!: any[];

  listRole = signal<IAuthority[]>([]);
  loading = signal<boolean>(false);
  totalElements = signal<number>(0);
  totalPages = signal<number>(0);

  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
    this.store
      .select(selectorRole)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result: IRoleAuthority) => {
          console.log('result ', result);
          if (result.entities.length === 0 && result.totalPages === -1) {
            this.store.dispatch(
              loadListRoles({
                page: 0,
                size: 5,
              })
            );
          } else if(result.entities.length){
            this.listRole.set(result.entities.slice());
            this.totalElements.set(result.totalElements);
            this.totalPages.set(result.totalPages);
            this.loading.set(result.loadingEntities);
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
