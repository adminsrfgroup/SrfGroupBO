import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RoleState } from '../../store/state/init.state';
import { addPermission } from '../../store/actions/permission.action';
import { IPermission } from '../../../../../shared/models/permission.model';
import { EPermission, LIST_PERMISSIONS } from '../../../../../shared/constants/authorities';
import { selectorDescriptionAddNewOffer } from '../../../offer-managment/store/selectors/offer.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IDescriptionNewOfferState } from '../../../offer-managment/store/state/offer.state';
import { resetTopSlide } from '../../../home-managment/store/actions/home.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectorPermission } from '../../store/selectors/role.selectors';

@Component({
    selector: 'app-add-update-permission',
    templateUrl: './add-update-permission.component.html',
    styleUrls: ['./add-update-permission.component.scss'],
})
export class AddUpdatePermissionComponent implements OnInit, OnDestroy {
    store = inject(Store<RoleState>);
    router = inject(Router);
    idEntity = signal<string | null>('');
    listPermissions = signal<IPermission[]>([]);

    formGroup!: FormGroup;

    destroy$: Subject<boolean> = new Subject<boolean>();

    private activatedRoute = inject(ActivatedRoute);

    constructor(private fb: FormBuilder) {
        const listTmp: IPermission[] = [];
        LIST_PERMISSIONS.map(item => {
            listTmp.push({
                name: item,
            });
        });
        this.listPermissions.set(listTmp);

        this.idEntity.set(this.activatedRoute.snapshot.paramMap.get('id'));
        if (Number(this.idEntity)) {
            // Dispatch to get entity
        }
    }
    ngOnInit(): void {
        this.initForm();

        this.store
            .select(selectorPermission)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IDescriptionNewOfferState) => {
                    console.log('result ', result);

                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetTopSlide());
                        this.router.navigate(['/private/role/list-permissions']).then();
                    }

                    if (this.idEntity() && result.entity) {
                        // Update form
                    }
                },
            });
    }

    private initForm() {
        this.formGroup = this.fb.group({
            name: new FormControl('', [Validators.required]),
            pathApi: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
        });
    }
    submitForm() {
        console.log('submitForm ', this.formGroup.getRawValue());
        if (this.formGroup.invalid) {
            return;
        }
        const requestData: IPermission = {
            ...this.formGroup.getRawValue(),
            name: this.formGroup.get('name')?.value.name,
        };
        this.store.dispatch(addPermission(requestData));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
