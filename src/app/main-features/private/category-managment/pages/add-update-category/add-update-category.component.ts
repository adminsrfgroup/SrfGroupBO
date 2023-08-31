import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getBase64 } from '../../../../../shared/utils/utils-functions';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { fetchOneAboutUs, resetAboutUs } from '../../../support-management/store/actions/about-us.actions';
import { Store } from '@ngrx/store';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { CategoryState } from '../../store/state/init.state';
import { fetchOneCategory, resetCategories, updateCategory } from '../../store/actions/category.action';
import { selectorAboutUs } from '../../../support-management/store/selectors/support.selectors';
import { Subject, takeUntil } from 'rxjs';
import { IAboutUsState } from '../../../support-management/store/state/support.state';
import { selectorCategory } from '../../store/selectors/category.selector';
import { addCgu, updateCgu } from '../../../support-management/store/actions/cgu.actions';

@Component({
    selector: 'app-add-update-category',
    templateUrl: './add-update-category.component.html',
    styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent implements OnInit {
    store = inject(Store<CategoryState>);
    formGroup!: FormGroup;

    fileCategory: string | undefined = '';

    idEntity = signal<number>(-1);

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
                    this.store.dispatch(fetchOneCategory(requestData));
                }
            },
        });
    }

    ngOnInit(): void {
        this.initForm();

        this.store
            .select(selectorCategory)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: CategoryState) => {
                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetCategories());
                        this.router.navigate(['/private/category/list']).then();
                    }

                    if (this.idEntity() && result.entity) {
                        // Update form
                        this.formGroup.patchValue({
                            id: result.entity.id,
                            titleAr: result.entity.titleAr,
                            titleFr: result.entity.titleFr,
                            titleEn: result.entity.titleEn,
                            imageContent: result.entity.imageContent,
                        });
                        this.fileCategory = result.entity.imageContent || '';
                        this.formGroup?.get('id')?.disable();
                    }
                },
            });
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            id: new FormControl('', []),
            titleAr: new FormControl('', [Validators.required]),
            titleFr: new FormControl('', [Validators.required]),
            titleEn: new FormControl('', [Validators.required]),
            imageContent: new FormControl('', [Validators.required]),
        });
    }

    selectFileCategory(event: Event): void {
        if ((event.target as HTMLInputElement).files?.length) {
            getBase64((event.target as HTMLInputElement).files![0]).then((result: any) => {
                this.fileCategory = result;
                this.formGroup.patchValue({
                    imageContent: this.fileCategory,
                });
            });
        }
    }

    addUpdateContent(): void {
        if (this.formGroup.value) {
            const requestData: ICgu = {
                id: this.idEntity(),
                ...this.formGroup.getRawValue(),
            };
            if (this.idEntity() > 0) {
                this.store.dispatch(updateCategory(requestData));
            } else {
                // this.store.dispatch(addCgu(requestData));
            }
        }
    }
}
