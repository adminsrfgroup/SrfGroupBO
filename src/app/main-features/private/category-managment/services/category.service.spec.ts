import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {PageCommon} from "../../../../shared/models/page.common";
import {ICategory} from "../../../../shared/models/category.model";
import {environment} from "../../../../../environments/environment";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('CategoryService', () => {
    let service: CategoryService;
  let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(CategoryService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

  it('should be call api get all categories', () => {
    // Given
    let page= 0, size = 5;
    const requestData: PageCommon<ICategory> = {
      content: [{
        id: 1,
        titleAr: 'titleAr',
        titleFr: 'titleFr',
        titleEn: 'titleEn',
        imageContent: 'imageContent'
      }],
      numberOfElements: 1,
      totalElements: 1,
      totalPages: 1,
    }

    // When
    service.fetchAllCategories(page, size).subscribe({
      next: (result: PageCommon<ICategory>) => {
        expect(result.content.length).not.toEqual(0);
        expect(result).toEqual(requestData);
      }
    })

    // Then
    const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/category/public?page=${page}&size=${size}`);
    resultRequest.flush(requestData);
    httpMock.verify();
    expect(resultRequest.request.method).toEqual('GET');
  })
});
