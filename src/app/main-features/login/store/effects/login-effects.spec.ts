import { TestBed } from '@angular/core/testing';

import { LoginEffects } from './login-effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { cold, hot } from 'jasmine-marbles';
import { loginAction, loginActionSuccess } from '../actions/login.action';
import { ILogin, IResponseLogin } from '../../models/login.model';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { LoginService } from '../../services/login.service';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { sessionAction, sessionActionSuccess } from '../actions/session.action';
import { IUser } from '../../../../shared/models/user.model';

describe('LoginEffectsService', () => {
    let effects: LoginEffects;
    let actions$: Observable<Action>;
    let testScheduler: TestScheduler;

    const MockLoginService = jasmine.createSpyObj('loginService', ['login', 'session']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [provideMockActions(() => actions$), LoginEffects, { provide: LoginService, useValue: MockLoginService }],
        });

        actions$ = TestBed.inject(Actions);
        effects = TestBed.inject(LoginEffects);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

    it('loginUser$ dispatches a success action', () => {
        // create an actions stream to represent a user that is typing
        const user: ILogin = {
            email: '',
            password: '',
            idOneSignal: '',
            rememberMe: false,
        };
        const responseMock: IResponseLogin = {
            token: 'azerty',
            refreshToken: 'azerty',
        };

        const action = loginAction(user);
        const outcome = loginActionSuccess({ payload: responseMock });

        testScheduler.run(({ hot, cold, expectObservable }) => {
            actions$ = hot('-a', { a: action });
            const response = cold('-b|', { b: responseMock });
            MockLoginService.login.and.returnValue(response);

            expectObservable(effects.loginUser$).toBe('--b', { b: outcome });
        });
    });

    it('sessionUser$ dispatches a success action', () => {
        // create an actions stream to represent a user that is typing
        const responseMock: IUser = {
            id: 1,
            username: 'test@test.com',
            email: 'test@test.com',
        };

        // create an actions stream to represent a user that is typing
        actions$ = hot('-a', { a: sessionAction() });

        // mock the service to prevent an HTTP request to return an array of customers
        const response = cold('-b|', { b: responseMock });
        MockLoginService.session.and.returnValue(response);

        // expect the first action to debounce and not to dispatch
        // expect the second action to result in a SUCCESS action
        const expected = hot('--b', {
            b: sessionActionSuccess({ payload: responseMock }),
        });

        expect(effects.sessionUser$).toBeObservable(expected);
    });
});
