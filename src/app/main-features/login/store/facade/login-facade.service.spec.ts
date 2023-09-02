import { TestBed } from '@angular/core/testing';

import { LoginFacadeService } from './login-facade.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('LoginFacadeService', () => {
    let service: LoginFacadeService;
    let store: MockStore;
    const initialState = {
        loading: false,
        errorMessage: '',
        token: '',
        refreshToken: '',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })],
        });
        store = TestBed.inject(MockStore);
        service = TestBed.inject(LoginFacadeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
