import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HomeService } from '../../services/home.service';
import { catchError, map, of, switchMap } from 'rxjs';
import {
    addTopSlides,
    addTopSlidesFailure,
    addTopSlidesSuccess,
    deleteTopSlides,
    deleteTopSlidesFailure,
    deleteTopSlidesSuccess,
    fetchOneTopSlides,
    fetchOneTopSlidesFailure,
    fetchOneTopSlidesSuccess,
    fetchTopSlides,
    fetchTopSlidesFailure,
    fetchTopSlidesSuccess,
    updateTopSlides,
    updateTopSlidesFailure,
    updateTopSlidesSuccess,
} from '../actions/home.actions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { PageCommon } from '../../../../../shared/models/page.common';
import { IFetchOneTopSlide } from '../../models/home.model';
import {
  addFeatureSlide,
  addFeatureSlideFailure,
  addFeatureSlideSuccess, deleteFeatureSlide, deleteFeatureSlideFailure, deleteFeatureSlideSuccess,
  fetchFeatureSlides,
  fetchFeatureSlidesFailure,
  fetchFeatureSlidesSuccess,
  fetchOneFeatureSlide,
  fetchOneFeatureSlideFailure,
  fetchOneFeatureSlideSuccess,
  updateFeatureSlide, updateFeatureSlideFailure,
  updateFeatureSlideSuccess
} from '../actions/feature-home.actions';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { FeatureHomeService } from '../../services/feature-home.service';

@Injectable()
export class HomeEffects {
    constructor(private actions$: Actions, private homeService: HomeService, private featureHomeService: FeatureHomeService) {}

    addTopSlide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addTopSlides.type),
            switchMap((payload: ITopHomeSlidesImages) => {
                return this.homeService.addTopSlide(payload).pipe(
                    map((data: ITopHomeSlidesImages) => {
                        return addTopSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addTopSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchTopSlide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchTopSlides.type),
            switchMap(() => {
                return this.homeService.fetchTopSlide().pipe(
                    map((data: PageCommon<ITopHomeSlidesImages>) => {
                        return fetchTopSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchTopSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchOneTopSlide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOneTopSlides.type),
            switchMap((payload: IFetchOneTopSlide) => {
                return this.homeService.fetchOneTopSlide(payload.id).pipe(
                    map((data: ITopHomeSlidesImages) => {
                        return fetchOneTopSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchOneTopSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateTopSlide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateTopSlides.type),
            switchMap((payload: ITopHomeSlidesImages) => {
                return this.homeService.updateTopSlide(payload).pipe(
                    map((data: ITopHomeSlidesImages) => {
                        return updateTopSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(updateTopSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    deleteTopSlide$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTopSlides.type),
            switchMap((payload: IFetchOneTopSlide) => {
                return this.homeService.deleteTopSlide(payload.id).pipe(
                    map((data: boolean) => {
                        return deleteTopSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(deleteTopSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    addFeatureSlide = createEffect(() =>
        this.actions$.pipe(
            ofType(addFeatureSlide.type),
            switchMap((payload: IPostHomeFeature) => {
                return this.featureHomeService.addFeatureSlide(payload).pipe(
                    map((data: IPostHomeFeature) => {
                        return addFeatureSlideSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addFeatureSlideFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    featchFeatureSlide = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchFeatureSlides.type),
            switchMap(() => {
                return this.featureHomeService.fetchFeatureSlide().pipe(
                    map((data: PageCommon<IPostHomeFeature>) => {
                        return fetchFeatureSlidesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(fetchFeatureSlidesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );


  fetchOneFeatureSlide = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOneFeatureSlide.type),
      switchMap((payload: IFetchOneTopSlide) => {
        return this.featureHomeService.fetchOneFeatureSlide(payload.id).pipe(
          map((data: IPostHomeFeature) => {
            return fetchOneFeatureSlideSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(fetchOneFeatureSlideFailure({ error: exception.error }));
          })
        );
      })
    )
  );



  updateFeatureSlide = createEffect(() =>
    this.actions$.pipe(
      ofType(updateFeatureSlide.type),
      switchMap((payload: IPostHomeFeature) => {
        return this.featureHomeService.updateFeatureSlide(payload).pipe(
          map((data: IPostHomeFeature) => {
            return updateFeatureSlideSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(updateFeatureSlideFailure({ error: exception.error }));
          })
        );
      })
    )
  );

  deleteFeatureSlide = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteFeatureSlide.type),
      switchMap((payload: IPostHomeFeature) => {
        return this.featureHomeService.deleteFeatureSlide(payload).pipe(
          map((data: boolean) => {
            return deleteFeatureSlideSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(deleteFeatureSlideFailure({ error: exception.error }));
          })
        );
      })
    )
  );
}
