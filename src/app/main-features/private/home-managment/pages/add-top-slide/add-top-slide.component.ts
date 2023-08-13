import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeState, ITopSlides } from '../../store/state/init.state';
import { addTopSlides, fetchOneTopSlides, resetTopSlide, updateTopSlides } from '../../store/actions/home.actions';
import { getBase64 } from '../../../../../shared/utils/utils-functions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { selectorTopSlides } from '../../store/selectors/home.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

@Component({
    selector: 'app-add-top-slide',
    templateUrl: './add-top-slide.component.html',
    styleUrls: ['./add-top-slide.component.scss'],
})
export class AddTopSlideComponent implements OnInit, OnDestroy {
    descriptionAr: string | undefined = '';
    descriptionFr: string | undefined = '';
    descriptionEn: string | undefined = '';
    errorImageDesktop = false;
    errorImageMobile = false;
    fileStateDesktop: string | undefined = '';
    fileStateMobile: string | undefined = '';

    idEntity!: number;

    destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private store: Store<HomeState>, private router: Router, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe({
            next: params => {
                this.idEntity = params['id'];
                if (this.idEntity) {
                    const requestData: IdEntity = {
                        id: this.idEntity,
                    };
                    this.store.dispatch(fetchOneTopSlides(requestData));
                }
            },
        });
    }

    ngOnInit() {
        this.store
            .select(selectorTopSlides)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (result: ITopSlides) => {
                    console.log('result ', result);
                    if (result.addSuccess || result.updateSuccess) {
                        this.store.dispatch(resetTopSlide());
                        this.router.navigate(['/private/home/top-slides']).then();
                    }

                    // For update
                    if (this.idEntity && result.entity) {
                        this.descriptionAr = result.entity.descriptionAr;
                        this.descriptionFr = result.entity.descriptionFr;
                        this.descriptionEn = result.entity.descriptionEn;
                        this.fileStateDesktop = result.entity.imageDesktop;
                        this.fileStateMobile = result.entity.imageMobile;
                    }
                },
            });
    }

    addUpdateTopSlide(): void {
        if (!this.errorImageDesktop || !this.errorImageMobile) {
            return;
        }
        const requestData: ITopHomeSlidesImages = {
            descriptionAr: this.descriptionAr,
            descriptionFr: this.descriptionFr,
            descriptionEn: this.descriptionEn,
            imageDesktop: this.fileStateDesktop,
            imageMobile: this.fileStateMobile,
        };
        if (this.idEntity) {
            this.store.dispatch(
                updateTopSlides({
                    id: this.idEntity,
                    ...requestData,
                })
            );
        } else {
            this.store.dispatch(addTopSlides(requestData));
        }
    }

    selectFileDesktop(event: any) {
        if (event?.target?.files?.length) {
            getBase64(event.target.files[0]).then((result: any) => {
                this.fileStateDesktop = result;
            });
        }
    }

    selectFileMobile(event: any) {
        if (event?.target?.files?.length) {
            getBase64(event.target.files[0]).then((result: any) => {
                this.fileStateMobile = result;
            });
        }
    }

    loadImageDesktop(img: any) {
        if (img) {
            if (img.target.naturalWidth != 2000 || img.target.naturalHeight != 1000) {
                this.errorImageDesktop = false;
            } else {
                this.errorImageDesktop = true;
            }
        }
    }

    loadImageMobile(img: any) {
        if (img) {
            if (img.target.naturalWidth != 500 || img.target.naturalHeight != 300) {
                this.errorImageMobile = false;
            } else {
                this.errorImageMobile = true;
            }
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
