import {Component, inject, OnDestroy, OnInit, signal, ViewEncapsulation, WritableSignal} from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../store/state/user.state';
import {ActivatedRoute, Router} from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { loadDetailsUser, updateAuthorityUser } from '../../store/actions/details-user.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectorUser } from '../../store/selectors/user.selectors';
import { IUser } from '../../../../../shared/models/user.model';
import { selectorRole } from '../../../role-managment/store/selectors/role.selectors';
import { IRoleAuthority } from '../../../role-managment/store/state/init.state';
import { loadListRoles } from '../../../role-managment/store/actions/role.action';
import { AllAppConfig } from '../../../../../config';
import { IAuthority } from '../../../../../shared/models/authority.model';
import { UpdateUserAuthorities } from '../../models/update-user-authorities';
import {hasAnyAuthority, protectedDefaultAuthorities} from "../../../../../shared/utils/utils-functions";
import {EPermission} from "../../../../../shared/constants/authorities";
import {StorageService} from "../../../../../shared/services/storage.service";

@Component({
    selector: 'app-details-user',
    templateUrl: './details-user.component.html',
    styleUrls: ['./details-user.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetailsUserComponent implements OnInit, OnDestroy {
    idEntity!: number;

    detailsUser: IUser = {};

    displayModal = false;

    destroy$: Subject<boolean> = new Subject<boolean>();
    sizePage: WritableSignal<number> = signal<number>(AllAppConfig.CATEGORY_MODULE.ITEMS_PER_PAGINATION);
    newPage: WritableSignal<number> = signal<number>(0);

    listRole: WritableSignal<IAuthority[]> = signal<IAuthority[]>([]);
    loadingRole = signal<boolean>(false);
    totalElementsRole = signal<number>(0);
    totalPagesRole = signal<number>(0);

    selectedAuthorities: IAuthority[] = [];
    valuesAuthorities: IAuthority[] = [];

    router = inject(Router);

    constructor(
        private store: Store<UserState>,
        private activatedRoute: ActivatedRoute
    ) {}
    ngOnInit(): void {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.idEntity = Number(id);
        if ( this.idEntity > 0 ) {
            const requestData: IdEntity = {
                id: this.idEntity,
            };
            this.store.dispatch(loadDetailsUser(requestData));
        }

        this.store
            .select(selectorUser)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: UserState) => {
                    if (result.updateAuthoritiesSuccess) {
                        this.detailsUser = {
                            ...this.detailsUser,
                            authorities: result.authorities.slice(),
                        };
                        this.valuesAuthorities = [];
                        result.authorities?.forEach(item => {
                            this.valuesAuthorities?.push(item);
                            this.listRole.mutate(ele =>
                                ele.push({
                                    id: item.id,
                                    name: item.name,
                                })
                            );
                        });
                    } else if (result.entity && !result.loading) {
                        this.detailsUser = result.entity;
                        this.detailsUser.authorities?.forEach(item => {
                            this.valuesAuthorities?.push(item);
                        });
                    }
                },
            });
    }

    updateAuthority(): void {
        this.displayModal = true;
        this.store
            .select(selectorRole)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IRoleAuthority) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.store.dispatch(
                            loadListRoles({
                                page: this.newPage(),
                                size: 100,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listRole.set([]);
                        result.entities.forEach(item => {
                            this.listRole.mutate(ele =>
                                ele.push({
                                    id: item.id,
                                    name: item.name,
                                })
                            );
                        });
                        this.totalElementsRole.set(result.totalElements);
                        this.totalPagesRole.set(result.totalPages);
                        this.loadingRole.set(result.loadingEntities);

                        this.selectedAuthorities = [];
                        this.detailsUser.authorities?.forEach(value => {
                            this.selectedAuthorities.push({
                                id: value.id,
                                name: value.name,
                            });
                        });
                    }
                },
            });
    }

    inputValueId(role: IAuthority): string {
        return role.id!.toString() || '';
    }

    getValueAddress(): string {
        return this.detailsUser?.address?.city + ', ' + this.detailsUser?.address?.country;
    }

    updateUserAuthority(): void {
        this.displayModal = false;
        const requestData: UpdateUserAuthorities = {
            userId: this.detailsUser.id,
            nameAuthority: this.selectedAuthorities.map(value => {
                return value.name;
            }),
        };
        this.store.dispatch(updateAuthorityUser(requestData));
    }

    isDisabledAuthority(authority: IAuthority): boolean{
        return protectedDefaultAuthorities(authority);
    }

    hasAuthority(namePermission: string): boolean{
        switch (namePermission){
            case 'EPermission.UPDATE_USER_AUTHORITY':
                return hasAnyAuthority([EPermission.UPDATE_USER_AUTHORITY]);
            case 'EPermission.BLOCKED_USER':
                return hasAnyAuthority([EPermission.BLOCKED_USER]);
            default:
                return false;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
