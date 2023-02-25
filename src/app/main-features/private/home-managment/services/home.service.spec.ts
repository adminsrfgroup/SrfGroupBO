import { TestBed } from '@angular/core/testing';

import { HomeService } from './home.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ITopHomeSlidesImages} from "../../../../shared/models/top-home-slides-images.model";
import {environment} from "../../../../../environments/environment";
import {PageCommon} from "../../../../shared/models/page.common";

describe('HomeService', () => {
  let service: HomeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HomeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be add new TopSlide', () => {
    // Given
    const requestData: ITopHomeSlidesImages = {
      descriptionAr: 'test',
      descriptionFr: 'test',
      descriptionEn: 'test',
      imageDesktop: 'test',
      imageMobile: 'test'
    }

    // When
    service.addTopSlide(requestData).subscribe({
      next: (value: ITopHomeSlidesImages) => {
        expect(value.descriptionAr).toEqual(requestData.descriptionAr);
      }
    })

    // Then
    const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/top-home-slides-images/admin/create`);
    resultRequest.flush(requestData);
    httpMock.verify();
    expect(resultRequest.request.method).toEqual('POST');
    expect(resultRequest.request.body).toEqual(requestData);
  });

  it('should be fetch list of TopSlide', () => {
    // Given
    const requestData: PageCommon<ITopHomeSlidesImages> = {
      content: [{
        id: 1,
        descriptionAr: 'test',
        descriptionFr: 'test',
        descriptionEn: 'test',
        imageDesktop: 'test',
        imageMobile: 'test'
      }],
      numberOfElements: 1,
      totalElements: 1,
      totalPages: 1
    }

    // When
    service.fetchTopSlide().subscribe({
      next: (value: PageCommon<ITopHomeSlidesImages>) => {
        expect(value).toEqual(requestData);
      }
    })

    // Then
    const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/top-home-slides-images/admin/slides`);
    resultRequest.flush(requestData);
    httpMock.verify();
    expect(resultRequest.request.method).toEqual('GET');
  });

  it('should be fetch one of TopSlide', () => {
    // Given
    const requestData: ITopHomeSlidesImages = {
      id: 1,
      descriptionAr: 'test',
      descriptionFr: 'test',
      descriptionEn: 'test',
      imageDesktop: 'test',
      imageMobile: 'test'
    }

    // When
    service.fetchOneTopSlide(1).subscribe({
      next: (value: ITopHomeSlidesImages) => {
        expect(value).toEqual(requestData);
      }
    })

    // Then
    const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/top-home-slides-images/admin/1`);
    resultRequest.flush(requestData);
    httpMock.verify();
    expect(resultRequest.request.method).toEqual('GET');
  });


  it('should be update TopSlide', () => {
    // Given
    const requestData: ITopHomeSlidesImages = {
      id: 1,
      descriptionAr: 'test',
      descriptionFr: 'test',
      descriptionEn: 'test',
      imageDesktop: 'test',
      imageMobile: 'test'
    }

    // When
    service.updateTopSlide(requestData).subscribe({
      next: (value: ITopHomeSlidesImages) => {
        expect(value).toEqual(requestData);
      }
    })

    // Then
    const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/top-home-slides-images/admin/update/${requestData.id}`);
    resultRequest.flush(requestData);
    httpMock.verify();
    expect(resultRequest.request.method).toEqual('PUT');
    expect(resultRequest.request.body).toEqual(requestData);
  });

});
