import { createAction, props } from '@ngrx/store';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { PageCommon } from '../../../../../shared/models/page.common';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

export const addTopSlides = createAction('[TopSlide] Add TopSlide', props<ITopHomeSlidesImages>());

export const addTopSlidesSuccess = createAction('[TopSlide] Add TopSlide Success', props<{ payload: ITopHomeSlidesImages }>());

export const addTopSlidesFailure = createAction('[TopSlide] Add TopSlide Failure', props<{ error: any }>());

export const fetchTopSlides = createAction(
    '[TopSlide] Fetch TopSlide'
    // props<>()
);

export const fetchTopSlidesSuccess = createAction('[TopSlide] Fetch TopSlide Success', props<{ payload: PageCommon<ITopHomeSlidesImages> }>());

export const fetchTopSlidesFailure = createAction('[TopSlide] fetch TopSlide Failure', props<{ error: any }>());

export const fetchOneTopSlides = createAction('[TopSlide] FetchOne TopSlide', props<IdEntity>());

export const fetchOneTopSlidesSuccess = createAction('[TopSlide] FetchOne TopSlide Success', props<{ payload: ITopHomeSlidesImages }>());

export const fetchOneTopSlidesFailure = createAction('[TopSlide] FetchOne TopSlide Failure', props<{ error: any }>());

export const updateTopSlides = createAction('[TopSlide] Update TopSlide', props<ITopHomeSlidesImages>());

export const updateTopSlidesSuccess = createAction('[TopSlide] Update TopSlide Success', props<{ payload: ITopHomeSlidesImages }>());

export const updateTopSlidesFailure = createAction('[TopSlide] Update TopSlide Failure', props<{ error: any }>());

export const deleteTopSlides = createAction('[TopSlide] Delete TopSlide', props<IdEntity>());

export const deleteTopSlidesSuccess = createAction('[TopSlide] Delete TopSlide Success', props<{ payload: boolean }>());

export const deleteTopSlidesFailure = createAction('[TopSlide] Delete TopSlide Failure', props<{ error: any }>());

export const resetTopSlide = createAction('[TopSlide] Reset TopSlide');
