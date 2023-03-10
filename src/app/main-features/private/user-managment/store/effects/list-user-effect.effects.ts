import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { ListUsersService } from '../../services/list-users.service';
import { loadListUsers, loadListUsersFailure, loadListUsersSuccess } from '../actions/list-user.actions';

@Injectable()
export class ListUserEffects {
    constructor(private actions$: Actions, private listUsersService: ListUsersService) {}

    fetchUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListUsers.type),
            switchMap((payload: any) => {
                return this.listUsersService.fetchAllUsers().pipe(
                    map((data: any) => {
                        if (data.error) {
                            return loadListUsersFailure({ error: data.error });
                        }
                        return loadListUsersSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListUsersFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
