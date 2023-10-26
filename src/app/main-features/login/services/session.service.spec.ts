import { TestBed } from '@angular/core/testing';

import { SessionService } from './session.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initSessionState } from '../store/state/session.state';

describe('SessionService', () => {
    let service: SessionService;
    const initialState = initSessionState;
    let storeSession: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideMockStore({ initialState })],
        });
        storeSession = TestBed.inject(MockStore);
        service = TestBed.inject(SessionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('check if authenticated', () => {
        // Given
        storeSession.setState({
            session: initialState,
        });

        // When
        const result = service.isAuthenticated();

        // Then
        result.subscribe({
            next: (res: boolean) => {
                expect(res).toBeFalse();
            },
            error: (err: boolean) => {
                expect(err).toBeFalse();
            },
        });
    });
});
