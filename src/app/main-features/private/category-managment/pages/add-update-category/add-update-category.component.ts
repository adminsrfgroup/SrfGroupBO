import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getBase64 } from '../../../../../shared/utils/utils-functions';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { Store } from '@ngrx/store';
import { ICgu } from '../../../../../shared/models/cgu.model';
import { CategoryState } from '../../store/state/init.state';
import { fetchOneCategory, resetCategories, updateCategory } from '../../store/actions/category.action';
import { Subject, takeUntil } from 'rxjs';
import { selectorCategory } from '../../store/selectors/category.selector';

@Component({
    selector: 'app-add-update-category',
    templateUrl: './add-update-category.component.html',
    styleUrls: ['./add-update-category.component.scss'],
})
export class AddUpdateCategoryComponent implements OnInit, OnDestroy {
    store = inject(Store<CategoryState>);
    formGroup!: FormGroup;

    fileCategory: string | undefined = '';

    idEntity = signal<number>(-1);

    destroy$: Subject<boolean> = new Subject<boolean>();

    router = inject(Router);

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {

        const id = this.activatedRoute.snapshot.paramMap.get('id');
        this.idEntity.set(Number(id));
        if (this.idEntity() > 0) {
            const requestData: IdEntity = {
                id: Number(this.idEntity()),
            };
            this.store.dispatch(fetchOneCategory(requestData));
        }

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
            getBase64((event.target as HTMLInputElement).files![0]).then((result: string | ArrayBuffer | null) => {
                this.fileCategory = (result || '').toString();
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

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
