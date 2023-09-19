import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ListUsersService } from '../../services/list-users.service';
import { loadListUsers, loadListUsersFailure, loadListUsersSuccess } from '../actions/list-user.actions';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { loadDetailsUser, loadDetailsUserFailure, loadDetailsUserSuccess, updateAuthorityUser, updateAuthorityUserFailure, updateAuthorityUserSuccess } from '../actions/details-user.actions';
import { IUser } from '../../../../../shared/models/user.model';
import { PageCommon } from '../../../../../shared/models/page.common';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthoritiesService } from '../../services/authorities.service';
import { UpdateUserAuthorities } from '../../models/update-user-authorities';
import { IAuthority } from '../../../../../shared/models/authority.model';

@Injectable()
export class ListUserEffects {
    constructor(
        private actions$: Actions,
        private listUsersService: ListUsersService,
        private authoritiesService: AuthoritiesService
    ) {}

    fetchListUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListUsers.type),
            switchMap(() => {
                return this.listUsersService.fetchAllUsers().pipe(
                    map((data: PageCommon<IUser>) => {
                        return loadListUsersSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadListUsersFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchDetailsUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadDetailsUser.type),
            switchMap((payload: IdEntity) => {
                return this.listUsersService.fetchDetailsUser(payload.id).pipe(
                    map((data: IUser) => {
                        return loadDetailsUserSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(loadDetailsUserFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    updateUserAuthorities$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAuthorityUser.type),
            switchMap((payload: UpdateUserAuthorities) => {
                return this.authoritiesService.updateUserAuthorities(payload).pipe(
                    map((data: IAuthority[]) => {
                        return updateAuthorityUserSuccess({ payload: data });
                    }),
                    catchError((exception: HttpErrorResponse) => {
                        return of(updateAuthorityUserFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
