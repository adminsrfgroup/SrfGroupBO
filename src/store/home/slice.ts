import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "./initial.state";
import topSlidesReducer from "./reducers/top-slides.reducer";
import featureHomeReducer from "./reducers/feature-home.reducer";

export const TOP_SLIDES_KEY_IN_STORE = "topSlides";

export const topSlidesSlice: Slice = createSlice({
  name: TOP_SLIDES_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...topSlidesReducer,
    ...featureHomeReducer
  }
});

export const {
  //? ********************| ADD TOP SLIDES ACTIONS |*******************/
  addTopSlides,
  addTopSlidesSuccess,
  addTopSlidesFailure,

  //? ********************| FETCH TOP SLIDES ACTIONS |*******************/
  fetchTopSlides,
  fetchTopSlidesSuccess,
  fetchTopSlidesFailure,
  resetTopSlides,

  //? ********************| FETCH TOP SLIDES BY ID ACTIONS |*******************/
  fetchTopSlidesById,
  fetchTopSlidesByIdSuccess,
  fetchTopSlidesByIdFailure,

  //? ********************| UPDATE TOP SLIDES ACTIONS |*******************/
  updateTopSlides,
  updateTopSlidesSuccess,
  updateTopSlidesFailure,

  //? ********************| FETCH FEATURE HOME ACTIONS |*******************/
  fetchFeatureHome,
  fetchFeatureHomeSuccess,
  fetchFeatureHomeFailure,

  //? ********************| FETCH FEATURE HOME ACTIONS |*******************/
  addFeatureHome,
  addFeatureHomeSuccess,
  addFeatureHomeFailure,
  resetFeatureHome,

  //? ********************| FETCH FEATURE BY ID ACTIONS |*******************/
  fetchFeatureHomeById,
  fetchFeatureHomeByIdSuccess,
  fetchFeatureHomeByIdFailure,

  //? ********************| UPDATE FEATURE HOME ACTIONS |*******************/
  updateFeatureHome,
  updateFeatureHomeSuccess,
  updateFeatureHomeFailure
} = topSlidesSlice.actions;

//? ********************| FETCH TOP SLIDES SELECTORS |*******************/
export const loadingTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.loading;
export const entityTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.entity;
export const loadingEntitiesTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.loadingEntities;
export const entitiesTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.entities;
export const totalItemsTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.totalItems;
export const totalPagesTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.totalPages;
export const addSuccessTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.addSuccess;
export const updateSuccessTopSlides = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].topSlides.updateSuccess;

//? ********************| FETCH FEATURE HOME SELECTORS |*******************/
export const loadingFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.loading;
export const entityFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.entity;
export const loadingEntitiesFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.loadingEntities;
export const entitiesFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.entities;
export const totalItemsFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.totalItems;
export const totalPagesFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.totalPages;
export const addSuccessFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.addSuccess;
export const updateSuccessFeatureHome = (state: any) =>
  state[TOP_SLIDES_KEY_IN_STORE].featureHome.updateSuccess;
