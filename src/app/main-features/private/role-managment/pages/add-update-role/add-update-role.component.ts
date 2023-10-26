import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { Store } from '@ngrx/store';
import { IRoleAuthority, IRolePermission } from '../../store/state/init.state';
import { addRole, fetchOneRole, resetRoles, updateRole } from '../../store/actions/role.action';
import { selectorPermission, selectorRole } from '../../store/selectors/role.selectors';
import { Subject, takeUntil } from 'rxjs';
import { loadListPermissions } from '../../store/actions/permission.action';
import { IPermission } from '../../../../../shared/models/permission.model';
import { IAuthority } from '../../../../../shared/models/authority.model';
import { CheckboxChangeEvent } from 'primeng/checkbox';
import { LIST_AUTHORITIES } from '../../../../../shared/constants/authorities';
import { protectedDefaultAuthorities } from '../../../../../shared/utils/utils-functions';

@Component({
    selector: 'app-add-update-role',
    templateUrl: './add-update-role.component.html',
    styleUrls: ['./add-update-role.component.scss'],
})
export class AddUpdateRoleComponent implements OnInit {
    formGroup!: FormGroup;
    storeAuthorities = inject(Store<IRoleAuthority>);
    storePermissions = inject(Store<IRolePermission>);
    idEntity = signal<number>(-1);
    destroy$: Subject<boolean> = new Subject<boolean>();

    categories = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
    ];
    nameAuthority = {
        value: '',
        label: '',
    };
    selectedAuthorities: IPermission[] = [];

    listPermissions: WritableSignal<IPermission[]> = signal<IPermission[]>([]);
    loading = signal<boolean>(false);
    totalElements = signal<number>(0);
    totalPages = signal<number>(0);

    router = inject(Router);

    isUpdate: WritableSignal<boolean> = signal<boolean>(false);

    listauthorities = LIST_AUTHORITIES.map(item => {
        return {
            value: item,
            label: item,
        };
    });

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.params.subscribe({
            next: params => {
                this.idEntity.set(params['id']);
                if (Number(this.idEntity()) > 0) {
                    const requestData: IdEntity = {
                        id: Number(this.idEntity()),
                    };
                    this.storeAuthorities.dispatch(fetchOneRole(requestData));
                }
            },
        });
    }

    ngOnInit(): void {
        this.initForm();

        this.storeAuthorities
            .select(selectorRole)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IRoleAuthority) => {
                    if (result.updateSuccess || result.addSuccess) {
                        this.storeAuthorities.dispatch(resetRoles());
                        this.router.navigate(['/private/role/list-role']).then();
                    } else {
                        // Update and Entity Authority Ready
                        if (this.idEntity() && result.entity?.id) {
                            this.nameAuthority = {
                                value: result.entity.name || '',
                                label: result.entity.name || '',
                            };

                            if (!result.loading && !this.isUpdate()) {
                                result.entity.permissions?.forEach(value => {
                                    this.selectedAuthorities.push(value);
                                });
                                this.isUpdate.set(true);

                                this.getAllPermissions();
                            }
                        }

                        // Add
                        if (!this.idEntity() && !result.entity?.id) {
                            this.getAllPermissions();
                        }
                    }
                },
            });
    }

    private getAllPermissions(): void {
        this.storePermissions
            .select(selectorPermission)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IRolePermission) => {
                    if (result.entities.length === 0 && result.totalPages === -1) {
                        this.storePermissions.dispatch(
                            loadListPermissions({
                                page: 0,
                                size: 5,
                            })
                        );
                    } else if (result.entities.length) {
                        this.listPermissions.set(result.entities.slice());
                        this.totalElements.set(result.totalElements);
                        this.totalPages.set(result.totalPages);
                        this.loading.set(result.loadingEntities);
                    }
                },
            });
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            name: new FormControl('', [Validators.required]),
            permissions: this.fb.array([]),
        });
    }

    get permissions(): FormArray {
        return this.formGroup.get('permissions') as FormArray;
    }

    inputValueId(permission: IPermission): string {
        return permission.id!.toString() || '';
    }

    updateAuthority(): void {
        if (this.nameAuthority) {
            const requestData: IAuthority = {
                id: this.idEntity() ? Number(this.idEntity()) : undefined,
                name: this.nameAuthority.value,
                permissions: this.selectedAuthorities,
            };
            if (this.idEntity() > 0) {
                this.storeAuthorities.dispatch(updateRole(requestData));
            } else {
                this.storeAuthorities.dispatch(addRole(requestData));
            }
        }
    }
}
