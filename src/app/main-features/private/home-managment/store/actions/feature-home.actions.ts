import { createAction, props } from '@ngrx/store';
import { IPostHomeFeature } from '../../../../../shared/models/post-home-feature.model';
import { PageCommon } from '../../../../../shared/models/page.common';
import {IIdEntity} from "../../../../../shared/models/id-entity.model";

export const addFeatureSlide = createAction('[FeatureSlide] Add FeatureSlide', props<IPostHomeFeature>());

export const addFeatureSlideSuccess = createAction('[FeatureSlide] Add FeatureSlide Success', props<{ payload: IPostHomeFeature }>());

export const addFeatureSlideFailure = createAction('[FeatureSlide] Add FeatureSlide Failure', props<{ error: any }>());

export const fetchFeatureSlides = createAction(
    '[FeatureSlide] Fetch FeatureSlide'
    // props<>()
);

export const fetchFeatureSlidesSuccess = createAction('[FeatureSlide] Fetch FeatureSlide Success', props<{ payload: PageCommon<IPostHomeFeature> }>());

export const fetchFeatureSlidesFailure = createAction('[FeatureSlide] fetch FeatureSlide Failure', props<{ error: any }>());

export const fetchOneFeatureSlide = createAction(
  '[FeatureSlide] Fetch One FeatureSlide',
  props<IIdEntity>()
);

export const fetchOneFeatureSlideSuccess = createAction('[FeatureSlide] Fetch One FeatureSlide Success', props<{ payload: IPostHomeFeature }>());

export const fetchOneFeatureSlideFailure = createAction('[FeatureSlide] fetch One FeatureSlide Failure', props<{ error: any }>());

export const updateFeatureSlide = createAction('[FeatureSlide] Update FeatureSlide', props<IPostHomeFeature>());

export const updateFeatureSlideSuccess = createAction('[FeatureSlide] Update FeatureSlide Success', props<{ payload: IPostHomeFeature }>());

export const updateFeatureSlideFailure = createAction('[FeatureSlide] Update FeatureSlide Failure', props<{ error: any }>());

export const deleteFeatureSlide = createAction('[FeatureSlide] Delete FeatureSlide', props<IPostHomeFeature>());

export const deleteFeatureSlideSuccess = createAction('[FeatureSlide] Delete FeatureSlide Success', props<{ payload: boolean }>());

export const deleteFeatureSlideFailure = createAction('[FeatureSlide] Delete FeatureSlide Failure', props<{ error: any }>());

export const resetFeatureSlide = createAction('[FeatureSlide] Reset Feature Slide');
