import { createAction, props } from '@ngrx/store';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { PageCommon } from '../../../../../shared/models/page.common';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';

export const addFeatureSlide = createAction('[FeatureSlide] Add FeatureSlide', props<IPostHomeFeature>());

export const addFeatureSlideSuccess = createAction('[FeatureSlide] Add FeatureSlide Success', props<{ payload: IPostHomeFeature }>());

export const addFeatureSlideFailure = createAction('[FeatureSlide] Add FeatureSlide Failure', props<{ error: any }>());

export const fetchFeatureSlides = createAction(
    '[FeatureSlide] Fetch FeatureSlide'
    // props<>()
);

export const fetchFeatureSlidesSuccess = createAction('[FeatureSlide] Fetch FeatureSlide Success', props<{ payload: PageCommon<IPostHomeFeature> }>());

export const fetchFeatureSlidesFailure = createAction('[FeatureSlide] fetch FeatureSlide Failure', props<{ error: any }>());

export const resetFeatureSlide = createAction('[FeatureSlide] Reset Feature Slide');
