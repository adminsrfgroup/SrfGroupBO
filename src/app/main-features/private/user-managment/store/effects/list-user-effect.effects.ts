import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { ListUsersService } from '../../services/list-users.service';
import { loadListUsers, loadListUsersFailure, loadListUsersSuccess } from '../actions/list-user.actions';
import { IdEntity } from '../../../../../shared/models/id-entity.model';
import { loadDetailsUser, loadDetailsUserFailure, loadDetailsUserSuccess } from '../actions/details-user.actions';
import { IUser } from '../../../../../shared/models/user.model';
import { deleteFeatureSlideFailure, deleteFeatureSlideSuccess } from '../../../home-managment/store/actions/feature-home.actions';
import { PageCommon } from '../../../../../shared/models/page.common';

@Injectable()
export class ListUserEffects {
    constructor(private actions$: Actions, private listUsersService: ListUsersService) {}

    fetchListUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListUsers.type),
            switchMap(() => {
                return this.listUsersService.fetchAllUsers().pipe(
                    map((data: PageCommon<IUser>) => {
                        return loadListUsersSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
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
                    catchError((exception: any) => {
                        return of(loadDetailsUserFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
