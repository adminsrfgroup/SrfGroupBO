import { TestBed } from '@angular/core/testing';

import { AboutUsService } from './about-us.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IAboutUs } from '../../../../shared/models/about-us.model';
import { environment } from '../../../../../environments/environment';
import { PageCommon } from '../../../../shared/models/page.common';

describe('AboutUsService', () => {
    let service: AboutUsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(AboutUsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('add new entity AboutUs', () => {
        // Given
        const responseMock: IAboutUs = {
            id: 1,
            contentAr: 'test',
            contentEn: 'test',
            contentFr: 'test',
        };
        const requestData: IAboutUs = {
            contentAr: 'test',
            contentEn: 'test',
            contentFr: 'test',
        };

        // When
        service.addAboutUs(requestData).subscribe({
            next: (result: IAboutUs) => {
                expect(result.id).toBeTruthy();
            },
        });

        // Then
        const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/aboutus/admin`);
        resultRequest.flush(responseMock);
        httpMock.verify();
    });

    it('get entities AboutUs', () => {
        // Given
        const responseMock: PageCommon<IAboutUs> = {
            content: [
                {
                    id: 1,
                    contentAr: 'test',
                    contentEn: 'test',
                    contentFr: 'test',
                },
            ],
            numberOfElements: 1,
            totalElements: 1,
            totalPages: 1,
        };
        const page = 0;
        const size = 5;

        // When
        service.fetchAllAboutUs(page, size).subscribe({
            next: (result: PageCommon<IAboutUs>) => {
                expect(result.content.length).toBeTruthy();
            },
        });

        // Then
        const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/aboutus/admin?page=${page}&size=${size}`);
        resultRequest.flush(responseMock);
        httpMock.verify();
    });

    it('get entity AboutUs', () => {
        // Given
        const responseMock: IAboutUs = {
            id: 1,
            contentAr: 'test',
            contentEn: 'test',
            contentFr: 'test',
        };
        const id = 1;

        // When
        service.fetchOneAboutUs(id).subscribe({
            next: (result: IAboutUs) => {
                expect(result.id).toEqual(id);
            },
        });

        // Then
        const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/aboutus/admin/${id}`);
        resultRequest.flush(responseMock);
        httpMock.verify();
    });
});
