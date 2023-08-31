import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAboutUsState } from '../../store/state/support.state';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { addAboutUs, fetchOneAboutUs, resetAboutUs } from '../../store/actions/about-us.actions';
import { Subject, takeUntil } from 'rxjs';
import { selectorAboutUs } from '../../store/selectors/support.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

@Component({
    selector: 'app-add-update-about-us',
    templateUrl: './add-update-about-us.component.html',
    styleUrls: ['./add-update-about-us.component.scss'],
})
export class AddUpdateAboutUsComponent implements OnInit, OnDestroy {
    formGroup!: FormGroup;

    idEntity = signal<number>(-1);

    store = inject(Store<IAboutUsState>);

    destroy$: Subject<boolean> = new Subject<boolean>();

    router = inject(Router);

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
                    this.store.dispatch(fetchOneAboutUs(requestData));
                }
            },
        });
    }
    ngOnInit(): void {
        this.initForm();

        this.store
            .select(selectorAboutUs)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IAboutUsState) => {
                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetAboutUs());
                        this.router.navigate(['/private/support/list-about-us']).then();
                    }

                    if (this.idEntity() && result.entity) {
                        // Update form
                        this.formGroup.patchValue({
                            contentAr: result.entity.contentAr,
                            contentFr: result.entity.contentFr,
                            contentEn: result.entity.contentEn,
                        });
                    }
                },
            });
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            contentAr: new FormControl('', [Validators.required]),
            contentFr: new FormControl('', [Validators.required]),
            contentEn: new FormControl('', [Validators.required]),
        });
    }

    addUpdateContent(): void {
        if (this.formGroup.value) {
            const requestData: IAboutUs = {
                ...this.formGroup.getRawValue(),
            };
            this.store.dispatch(addAboutUs(requestData));
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
