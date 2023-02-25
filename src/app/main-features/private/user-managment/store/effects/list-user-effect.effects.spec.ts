import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ListUserEffects } from './list-user-effect.effects';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {loadListUsers, loadListUsersSuccess} from "../actions/list-user.actions";
import {PageCommon} from "../../../../../shared/models/page.common";
import {IUser} from "../../../../../shared/models/user.model";
import {TestScheduler} from "rxjs/internal/testing/TestScheduler";
import {ListUsersService} from "../../services/list-users.service";

describe('ListUserEffects', () => {
  let actions$: Observable<any>;
  let effects: ListUserEffects;
  let testScheduler: TestScheduler;
  const MockUserService = jasmine.createSpyObj('listUsersService', [
    'fetchAllUsers'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ListUserEffects,
        provideMockActions(() => actions$),
        { provide: ListUsersService, useValue: MockUserService }
      ]
    });

    effects = TestBed.inject(ListUserEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('fetchUser$ dispatches a success action', () => {

    // create an actions stream to represent a user that is typing
    const responseMock: PageCommon<IUser> = {
      content: [{

      }],
      numberOfElements: 1,
      totalElements: 1,
      totalPages: 1
    }

    const action = loadListUsers();
    const outcome = loadListUsersSuccess({payload: responseMock});


    testScheduler.run(({ hot, cold, expectObservable }) => {
      actions$ = hot('-a', { a: action });
      const response = cold('-b|', { b: responseMock });
      MockUserService.fetchAllUsers.and.returnValue(response);

      expectObservable(effects.fetchUser$).toBe('--b', { b: outcome });
    });
  });
});
