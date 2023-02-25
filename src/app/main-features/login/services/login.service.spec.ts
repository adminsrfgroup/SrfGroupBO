import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ILogin, IResponseLogin } from '../models/login.model';
import { environment } from '../../../../environments/environment';
import { IUser } from '../../../shared/models/user.model';

describe('LoginService', () => {
    let service: LoginService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(LoginService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be call api login', () => {
        // Given
        const responseMock: IResponseLogin = {
            token: 'azerty',
            refreshToken: 'azerty',
        };
        const userMock: ILogin = {
            email: 'test@gmail.com',
            password: 'test',
            idOneSignal: 'azerty',
            rememberMe: true,
        };

        // When
        service.login(userMock).subscribe({
            next: (data: IResponseLogin) => {
                expect(data).toEqual(responseMock);
            },
        });

        // Then
        const resultRequest = httpMock.expectOne(`${environment.baseUrl}api/user/public/signin`);
        resultRequest.flush(responseMock);
        httpMock.verify();
    });

    it('should be call api session', () => {
        // Given
        const responseMock: IUser = {
            id: 1,
            username: 'test@gmail.com',
            email: 'test@gmail.com',
        };

        // When
        service.session().subscribe({
            next: (data: IUser) => {
                expect(data).toEqual(responseMock);
            },
        });

        // Then
        const request = httpMock.expectOne(`${environment.baseUrl}api/user/current-user`);
        request.flush(responseMock);
        httpMock.verify();
    });
});
