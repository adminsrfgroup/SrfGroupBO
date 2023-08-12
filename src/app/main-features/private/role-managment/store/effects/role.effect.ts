import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {RoleService} from "../../services/role.service";
import {catchError, map, of, switchMap} from "rxjs";
import {Pagination} from "../../../../../shared/models/page.common";
import {loadListRoles, loadListRolesFailure, loadListRolesSuccess} from "../actions/role.action";
import {PermissionService} from "../../services/permission.service";
import {
  addPermission,
  addPermissionFailure,
  addPermissionSuccess,
  loadListPermissions, loadListPermissionsFailure, loadListPermissionsSuccess
} from "../actions/permission.action";
import {IPermission} from "../../../../../shared/models/permission.model";

@Injectable()
export class RoleEffects {

  constructor(private actions$: Actions,
              private roleService: RoleService,
              private permissionService: PermissionService) {}

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
