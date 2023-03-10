import { homeReducer } from './home.reducer';
import { HomeState, initHomeState } from '../state/init.state';
import { addTopSlidesSuccess } from '../actions/home.actions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';

describe('Home Reducers', () => {
    it('should return init state', () => {
        const action = {
            type: 'Unknown',
        };
        const state = homeReducer(initHomeState, action);

        expect(state).toBe(initHomeState);
    });

    it('should update the loading addTopSlides in an immutable way', () => {
        const newState: HomeState = {
            topSlides: {
                loading: false,
                entity: {
                    id: 1,
                    descriptionAr: 'test',
                    descriptionFr: 'test',
                    descriptionEn: 'test',
                    imageDesktop: 'test',
                    imageMobile: 'test',
                },
                loadingEntities: false,
                entities: [],
                updateSuccess: false,
                loadingReport: false,
                reportSuccess: false,
                errorMessage: '',
                totalItems: -1,
                totalPages: -1,
                loadingImport: false,
                addSuccess: true,
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
                totalItems: -1,
                totalPages: -1,
                loadingImport: false,
                addSuccess: false,
                deleteSuccess: false,
            },
        };
        const responseMock: ITopHomeSlidesImages = {
            id: 1,
            descriptionAr: 'test',
            descriptionFr: 'test',
            descriptionEn: 'test',
            imageDesktop: 'test',
            imageMobile: 'test',
        };
        const action = addTopSlidesSuccess({ payload: responseMock });
        const state = homeReducer(initHomeState, action);

        console.log('state ', state);
        expect(state).toEqual(newState);
        expect(state).not.toBe(newState);
    });
});
