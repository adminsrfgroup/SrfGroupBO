import {Action, ActionReducer, createReducer, on} from "@ngrx/store";
import {HomeState, initHomeState} from "../state/init.state";
import {
  addTopSlides,
  addTopSlidesFailure,
  addTopSlidesSuccess, fetchOneTopSlides, fetchOneTopSlidesFailure, fetchOneTopSlidesSuccess,
  fetchTopSlides, fetchTopSlidesFailure, fetchTopSlidesSuccess,
  resetTopSlide, updateTopSlides, updateTopSlidesFailure, updateTopSlidesSuccess
} from "../actions/home.actions";

export const homeReducer: ActionReducer<HomeState, Action> = createReducer(
  initHomeState,
  on(addTopSlides, (state: HomeState) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        addSuccess: false,
        loading: true
      },
    };
  }),
  on(addTopSlidesSuccess, (state: HomeState, action: ReturnType<typeof addTopSlidesSuccess>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        entity: action.payload,
        loading: false,
        addSuccess: true,
      },
    };
  }),
  on(addTopSlidesFailure, (state: HomeState, action: ReturnType<typeof addTopSlidesFailure>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        loading: false,
        errorMessage: action.error
      },
    };
  }),

  on(fetchTopSlides, (state: HomeState) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        totalPages: 0,
        totalItems: 0,
        loadingEntities: true
      },
    };
  }),
  on(fetchTopSlidesSuccess, (state: HomeState, action: ReturnType<typeof fetchTopSlidesSuccess>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        entities: action.payload?.content,
        totalItems: action.payload?.totalElements,
        totalPages: action.payload?.totalPages,
        loadingEntities: false,
      },
    };
  }),
  on(fetchTopSlidesFailure, (state: HomeState, action: ReturnType<typeof fetchTopSlidesFailure>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        loadingEntities: false,
        errorMessage: action.error
      },
    };
  }),

  on(fetchOneTopSlides, (state: HomeState) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        loading: true
      },
    };
  }),
  on(fetchOneTopSlidesSuccess, (state: HomeState, action: ReturnType<typeof fetchOneTopSlidesSuccess>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        entity: action.payload,
        loading: false,
      },
    };
  }),
  on(fetchOneTopSlidesFailure, (state: HomeState, action: ReturnType<typeof fetchOneTopSlidesFailure>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        loading: false,
        errorMessage: action.error
      },
    };
  }),

  on(updateTopSlides, (state: HomeState) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        updateSuccess: false,
        loading: true
      },
    };
  }),
  on(updateTopSlidesSuccess, (state: HomeState, action: ReturnType<typeof updateTopSlidesSuccess>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        entity: action.payload,
        loading: false,
        updateSuccess: true,
      },
    };
  }),
  on(updateTopSlidesFailure, (state: HomeState, action: ReturnType<typeof updateTopSlidesFailure>) => {
    return {
      ...state,
      topSlides: {
        ...state.topSlides,
        loading: false,
        errorMessage: action.error
      },
    };
  }),

  on(resetTopSlide, (state: HomeState) => {
    return {
      ...state,
      topSlides: initHomeState.topSlides
    };
  }),
)
