import { TestBed } from '@angular/core/testing';

import { SessionFacadeService } from './session-facade.service';
import {MockStore, provideMockStore} from "@ngrx/store/testing";

describe('SessionFacadeService', () => {
    let service: SessionFacadeService;
    let store: MockStore;
    const initialState = {
      isAuthenticated: false,
      token: '',
      currentUser: {},
      nbeNotificationsNotRead: 0,
      nbeMessagesNotRead: 0,
      nbeCarts: 0,
      oneSignalId: '',
      loading: false,
      errorMessage: '',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [provideMockStore({ initialState })],
        });
        store = TestBed.inject(MockStore);
        service = TestBed.inject(SessionFacadeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
