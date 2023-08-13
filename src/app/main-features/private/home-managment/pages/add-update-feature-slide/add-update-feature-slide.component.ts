import { Component, OnDestroy, OnInit } from '@angular/core';
import { getBase64 } from '../../../../../shared/utils/utils-functions';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { HomeState, IFeatureHome } from '../../store/state/init.state';
import { Store } from '@ngrx/store';
import { addFeatureSlide, fetchOneFeatureSlide, resetFeatureSlide, updateFeatureSlide } from '../../store/actions/feature-home.actions';
import { selectorFeatureHome } from '../../store/selectors/home.selectors';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

@Component({
    selector: 'app-add-update-feature-slide',
    templateUrl: './add-update-feature-slide.component.html',
    styleUrls: ['./add-update-feature-slide.component.scss'],
})
export class AddUpdateFeatureSlideComponent implements OnInit, OnDestroy {
    idEntity!: number;

    fileState: string | undefined = '';

    descriptionAr: string | undefined = '';
    descriptionFr: string | undefined = '';
    descriptionEn: string | undefined = '';

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<HomeState>, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe({
            next: params => {
                this.idEntity = params['id'];
                if (this.idEntity) {
                    const requestData: IdEntity = {
                        id: this.idEntity,
                    };
                    console.log('requestData ', requestData);
                    this.store.dispatch(fetchOneFeatureSlide(requestData));
                }
            },
        });
    }

    ngOnInit() {
        this.store
            .select(selectorFeatureHome)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: IFeatureHome) => {
                    console.log('result ', result);
                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetFeatureSlide());
                        this.router.navigate(['/private/home/list-feature-slide']);
                    }

                    // For update
                    if (this.idEntity && result.entity) {
                        this.descriptionAr = result.entity.descriptionAr;
                        this.descriptionFr = result.entity.descriptionFr;
                        this.descriptionEn = result.entity.descriptionEn;
                        this.fileState = result.entity.image;
                    }
                },
            });
    }

    selectFile(event: any) {
        if (event?.target?.files?.length) {
            getBase64(event.target.files[0]).then((result: any) => {
                this.fileState = result;
            });
        }
    }

    addUpdateFeatureSlide(): void {
        if (!this.fileState) {
            return;
        }

        const requestData: IPostHomeFeature = {
            descriptionAr: this.descriptionAr,
            descriptionFr: this.descriptionFr,
            descriptionEn: this.descriptionEn,
            image: this.fileState,
        };
        if (this.idEntity) {
            this.store.dispatch(
                updateFeatureSlide({
                    id: this.idEntity,
                    ...requestData,
                })
            );
        } else {
            this.store.dispatch(addFeatureSlide(requestData));
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
