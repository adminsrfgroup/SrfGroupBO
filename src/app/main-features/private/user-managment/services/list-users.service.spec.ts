import { TestBed } from '@angular/core/testing';

import { ListUsersService } from './list-users.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { PageCommon } from '../../../../shared/models/page.common';
import { environment } from '../../../../../environments/environment';
import { IUser } from '../../../../shared/models/user.model';

describe('ListUsersService', () => {
    let service: ListUsersService;
    let httpMock: HttpTestingController;

    const initialState = {
        loading: false,
        errorMessage: '',
        token: '',
        refreshToken: '',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [provideMockStore({ initialState })],
        });
        service = TestBed.inject(ListUsersService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be fetch list of TopSlide', () => {
        // Given
        const requestData: PageCommon<IUser> = {
            content: [
                {
                    id: 1,
                },
            ],
            numberOfElements: 1,
            totalElements: 1,
            totalPages: 1,
        };

        // When
        service.fetchAllUsers().subscribe({
            next: (value: PageCommon<IUser>) => {
                expect(value).toEqual(requestData);
            },
        });

        // Then
        const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/user/admin/list-users`);
        resultRequest.flush(requestData);
        httpMock.verify();
        expect(resultRequest.request.method).toEqual('GET');
    });
});
