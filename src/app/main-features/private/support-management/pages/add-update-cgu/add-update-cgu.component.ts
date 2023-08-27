import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { addAboutUs, fetchOneAboutUs } from '../../store/actions/about-us.actions';
import { IAboutUs } from '../../../../../shared/models/about-us.model';
import { addCgu, loadListCgu, resetCgu, updateCgu } from '../../store/actions/cgu.actions';
import { selectorCgu } from '../../store/selectors/support.selectors';
import { ICguState } from '../../store/state/support.state';
import { resetFaq } from '../../store/actions/faq.actions';

@Component({
    selector: 'app-add-update-cgu',
    templateUrl: './add-update-cgu.component.html',
    styleUrls: ['./add-update-cgu.component.scss'],
})
export class AddUpdateCguComponent implements OnInit, OnDestroy {
    formGroup!: FormGroup;
    idEntity = signal<number>(-1);

    store = inject(Store<ICguState>);

    destroy$: Subject<boolean> = new Subject<boolean>();

    router = inject(Router);

    constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute) {
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
            .select(selectorCgu)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: ICguState) => {
                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetCgu());
                        this.router.navigate(['/private/support/list-cgu']).then();
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
            const requestData: ICgu = {
                id: this.idEntity(),
                ...this.formGroup.getRawValue(),
            };

            if (this.idEntity() > 0) {
                this.store.dispatch(updateCgu(requestData));
            } else {
                this.store.dispatch(addCgu(requestData));
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
