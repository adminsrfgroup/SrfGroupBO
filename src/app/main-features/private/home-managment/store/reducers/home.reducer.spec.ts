import {PageCommon} from "../../../../../shared/models/page.common";
import {IUser} from "../../../../../shared/models/user.model";
import {homeReducer} from "./home.reducer";
import {HomeState, initHomeState} from "../state/init.state";
import {addTopSlidesSuccess} from "../actions/home.actions";
import {ITopHomeSlidesImages} from "../../../../../shared/models/top-home-slides-images.model";

describe('Home Reducers', () => {
  it('should return init state', () => {
    const action = {
      type: 'Unknown'
    };
    const state = homeReducer(initHomeState, action);

    expect(state).toBe(initHomeState);
  });

  it('should update the loading addTopSlides in an immutable way', () => {
    const newState: HomeState = {
      topSlides: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        loadingReport: false,
        reportSuccess: false,
        errorMessage: '',
        totalItems: 0,
        totalPages: 0,
        loadingImport: false,
        addSuccess: false,
        deleteSuccess: false,
      },
      featureHome: {
        loading: false,
        entity: {},
        loadingEntities: false,
        entities: [],
        updateSuccess: false,
        loadingReport: false,
        reportSuccess: false,
        errorMessage: '',
        totalItems: 0,
        totalPages: 0,
        loadingImport: false,
        addSuccess: false,
      }
    };
    const responseMock: ITopHomeSlidesImages = {
      id: 1,
      descriptionAr: 'test',
      descriptionFr: 'test',
      descriptionEn: 'test',
      imageDesktop: 'test',
      imageMobile: 'test'
    }
    const action = addTopSlidesSuccess({ payload: responseMock });
    const state = homeReducer(initHomeState, action);

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

});
