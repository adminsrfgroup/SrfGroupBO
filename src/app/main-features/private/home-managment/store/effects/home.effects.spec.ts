import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { HomeEffects } from './home.effects';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HomeService } from '../../services/home.service';
import { PageCommon } from '../../../../../shared/models/page.common';
import { addTopSlides, addTopSlidesSuccess, fetchOneTopSlides, fetchOneTopSlidesSuccess, fetchTopSlides, fetchTopSlidesSuccess } from '../actions/home.actions';
import { ITopHomeSlidesImages } from '../../../../../shared/models/top-home-slides-images.model';
import { IdEntity } from '../../../../../shared/models/id-entity.model';

describe('HomeEffects', () => {
    let actions$: Observable<any>;
    let effects: HomeEffects;
    let testScheduler: TestScheduler;
    const MockHomeService = jasmine.createSpyObj('homeService', ['addTopSlide', 'fetchTopSlide', 'fetchOneTopSlide', 'updateTopSlide']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HomeEffects, provideMockActions(() => actions$), { provide: HomeService, useValue: MockHomeService }],
        });

        effects = TestBed.inject(HomeEffects);
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('addTopSlide$ dispatches a success action', () => {
        // create an actions stream to represent a user that is typing
        const requestData: ITopHomeSlidesImages = {
            descriptionAr: 'test',
            descriptionFr: 'test',
            descriptionEn: 'test',
            imageDesktop: 'test',
            imageMobile: 'test',
        };
        const responseMock: ITopHomeSlidesImages = {
            id: 1,
            descriptionAr: 'test',
            descriptionFr: 'test',
            descriptionEn: 'test',
            imageDesktop: 'test',
            imageMobile: 'test',
        };

        const action = addTopSlides(requestData);
        const outcome = addTopSlidesSuccess({ payload: responseMock });

        testScheduler.run(({ hot, cold, expectObservable }) => {
            actions$ = hot('-a', { a: action });
            const response = cold('-b|', { b: responseMock });
            MockHomeService.addTopSlide.and.returnValue(response);

            expectObservable(effects.addTopSlide$).toBe('--b', { b: outcome });
        });
    });

    it('fetchTopSlide$ dispatches a success action', () => {
        const responseMock: PageCommon<ITopHomeSlidesImages> = {
            content: [
                {
                    id: 1,
                    descriptionAr: 'test',
                    descriptionFr: 'test',
                    descriptionEn: 'test',
                    imageDesktop: 'test',
                    imageMobile: 'test',
                },
            ],
            numberOfElements: 1,
            totalElements: 1,
            totalPages: 1,
        };

        const action = fetchTopSlides();
        const outcome = fetchTopSlidesSuccess({ payload: responseMock });

        testScheduler.run(({ hot, cold, expectObservable }) => {
            actions$ = hot('-a', { a: action });
            const response = cold('-b|', { b: responseMock });
            MockHomeService.fetchTopSlide.and.returnValue(response);

            expectObservable(effects.fetchTopSlide$).toBe('--b', { b: outcome });
        });
    });

    it('fetchOneTopSlide$ dispatches a success action', () => {
        const requestData: IdEntity = {
            id: 1,
        };
        const responseMock: ITopHomeSlidesImages = {
            id: 1,
            descriptionAr: 'test',
            descriptionFr: 'test',
            descriptionEn: 'test',
            imageDesktop: 'test',
            imageMobile: 'test',
        };

        const action = fetchOneTopSlides(requestData);
        const outcome = fetchOneTopSlidesSuccess({ payload: responseMock });

        testScheduler.run(({ hot, cold, expectObservable }) => {
            actions$ = hot('-a', { a: action });
            const response = cold('-b|', { b: responseMock });
            MockHomeService.fetchOneTopSlide.and.returnValue(response);

            expectObservable(effects.fetchOneTopSlide$).toBe('--b', { b: outcome });
        });
    });
});
