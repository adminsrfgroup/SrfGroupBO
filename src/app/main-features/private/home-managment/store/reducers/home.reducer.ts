import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { HomeState, initHomeState } from '../state/init.state';
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
    resetTopSlide,
    updateTopSlides,
    updateTopSlidesFailure,
    updateTopSlidesSuccess,
} from '../actions/home.actions';
import {
  addFeatureSlide,
  addFeatureSlideFailure,
  addFeatureSlideSuccess, deleteFeatureSlide, deleteFeatureSlideFailure, deleteFeatureSlideSuccess,
  fetchFeatureSlides,
  fetchFeatureSlidesFailure,
  fetchFeatureSlidesSuccess, fetchOneFeatureSlide, fetchOneFeatureSlideFailure, fetchOneFeatureSlideSuccess,
  resetFeatureSlide, updateFeatureSlide, updateFeatureSlideFailure, updateFeatureSlideSuccess,
} from '../actions/feature-home.actions';

export const homeReducer: ActionReducer<HomeState, Action> = createReducer(
    initHomeState,
    on(addTopSlides, (state: HomeState) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                addSuccess: false,
                loading: true,
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
                errorMessage: action.error,
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
                loadingEntities: true,
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
                errorMessage: action.error,
            },
        };
    }),

    on(fetchOneTopSlides, (state: HomeState) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                loading: true,
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
                errorMessage: action.error,
            },
        };
    }),

    on(updateTopSlides, (state: HomeState) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                updateSuccess: false,
                loading: true,
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
                errorMessage: action.error,
            },
        };
    }),

    on(deleteTopSlides, (state: HomeState) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                deleteSuccess: false,
                loading: true,
            },
        };
    }),
    on(deleteTopSlidesSuccess, (state: HomeState, action: ReturnType<typeof deleteTopSlidesSuccess>) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                loading: false,
                deleteSuccess: true,
            },
        };
    }),
    on(deleteTopSlidesFailure, (state: HomeState, action: ReturnType<typeof deleteTopSlidesFailure>) => {
        return {
            ...state,
            topSlides: {
                ...state.topSlides,
                loading: false,
                errorMessage: action.error,
            },
        };
    }),

    on(resetTopSlide, (state: HomeState) => {
        return {
            ...state,
            topSlides: initHomeState.topSlides,
        };
    }),

    on(addFeatureSlide, (state: HomeState) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                addSuccess: false,
                loading: true,
            },
        };
    }),
    on(addFeatureSlideSuccess, (state: HomeState, action: ReturnType<typeof addFeatureSlideSuccess>) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                entity: action.payload,
                loading: false,
                addSuccess: true,
            },
        };
    }),
    on(addFeatureSlideFailure, (state: HomeState, action: ReturnType<typeof addFeatureSlideFailure>) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                loading: false,
                errorMessage: action.error,
            },
        };
    }),

    on(fetchFeatureSlides, (state: HomeState) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                totalPages: 0,
                totalItems: 0,
                loadingEntities: true,
            },
        };
    }),
    on(fetchFeatureSlidesSuccess, (state: HomeState, action: ReturnType<typeof fetchFeatureSlidesSuccess>) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                entities: action.payload?.content,
                totalItems: action.payload?.totalElements,
                totalPages: action.payload?.totalPages,
                loadingEntities: false,
            },
        };
    }),
    on(fetchFeatureSlidesFailure, (state: HomeState, action: ReturnType<typeof fetchFeatureSlidesFailure>) => {
        return {
            ...state,
            featureHome: {
                ...state.featureHome,
                loadingEntities: false,
                errorMessage: action.error,
            },
        };
    }),

  on(fetchOneFeatureSlide, (state: HomeState) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        loading: true,
      },
    };
  }),
  on(fetchOneFeatureSlideSuccess, (state: HomeState, action: ReturnType<typeof fetchOneFeatureSlideSuccess>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        entity: action.payload,
        loading: false,
      },
    };
  }),
  on(fetchOneFeatureSlideFailure, (state: HomeState, action: ReturnType<typeof fetchOneFeatureSlideFailure>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        loading: false,
        errorMessage: action.error,
      },
    };
  }),


  on(updateFeatureSlide, (state: HomeState) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        updateSuccess: false,
        loading: true,
      },
    };
  }),
  on(updateFeatureSlideSuccess, (state: HomeState, action: ReturnType<typeof updateFeatureSlideSuccess>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        entity: action.payload,
        loading: false,
        updateSuccess: true,
      },
    };
  }),
  on(updateFeatureSlideFailure, (state: HomeState, action: ReturnType<typeof updateFeatureSlideFailure>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        loading: false,
        errorMessage: action.error,
      },
    };
  }),


  on(deleteFeatureSlide, (state: HomeState) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        deleteSuccess: false,
        loading: true,
      },
    };
  }),
  on(deleteFeatureSlideSuccess, (state: HomeState, action: ReturnType<typeof deleteFeatureSlideSuccess>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        entity: action.payload,
        loading: false,
        deleteSuccess: true,
      },
    };
  }),
  on(deleteFeatureSlideFailure, (state: HomeState, action: ReturnType<typeof deleteFeatureSlideFailure>) => {
    return {
      ...state,
      featureHome: {
        ...state.featureHome,
        loading: false,
        errorMessage: action.error,
      },
    };
  }),

    on(resetFeatureSlide, (state: HomeState) => {
        return {
            ...state,
            featureHome: initHomeState.featureHome,
        };
    })
);
