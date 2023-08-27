import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RoleService } from '../../services/role.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { Pagination } from '../../../../../shared/models/page.common';
import {
  fetchOneRole,
  loadfOneRoleSuccess,
  loadListRoles,
  loadListRolesFailure,
  loadListRolesSuccess, loadOneRoleFailure, updateRole, updateRoleFailure, updateRoleSuccess
} from '../actions/role.action';
import { PermissionService } from '../../services/permission.service';
import { addPermission, addPermissionFailure, addPermissionSuccess, loadListPermissions, loadListPermissionsFailure, loadListPermissionsSuccess } from '../actions/permission.action';
import { IPermission } from '../../../../../shared/models/permission.model';
import {IdEntity} from "../../../../../shared/models/id-entity.model";
import {IAuthority} from "../../../../../shared/models/authority.model";

@Injectable()
export class RoleEffects {
    constructor(private actions$: Actions, private roleService: RoleService, private permissionService: PermissionService) {}

    fetchListOffers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListRoles.type),
            switchMap((payload: Pagination) => {
                return this.roleService.fetchAllRoles(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListRolesSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListRolesFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

  fetchOneRole = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOneRole.type),
      switchMap((payload: IdEntity) => {
        return this.roleService.fetchOneRole(payload.id).pipe(
          map((data: IAuthority) => {
            return loadfOneRoleSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(loadOneRoleFailure({ error: exception.error }));
          })
        );
      })
    )
  );

  updateRole = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRole.type),
      switchMap((payload: IAuthority) => {
        return this.roleService.updateRole(payload).pipe(
          map((data: IAuthority) => {
            return updateRoleSuccess({ payload: data });
          }),
          catchError((exception: any) => {
            return of(updateRoleFailure({ error: exception.error }));
          })
        );
      })
    )
  );

    addPermission$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addPermission.type),
            switchMap((payload: IPermission) => {
                return this.permissionService.addPermission(payload).pipe(
                    map((data: any) => {
                        return addPermissionSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(addPermissionFailure({ error: exception.error }));
                    })
                );
            })
        )
    );

    fetchPermissions$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadListPermissions.type),
            switchMap((payload: Pagination) => {
                return this.permissionService.fetchPermissions(payload.page, payload.size).pipe(
                    map((data: any) => {
                        return loadListPermissionsSuccess({ payload: data });
                    }),
                    catchError((exception: any) => {
                        return of(loadListPermissionsFailure({ error: exception.error }));
                    })
                );
            })
        )
    );
}
