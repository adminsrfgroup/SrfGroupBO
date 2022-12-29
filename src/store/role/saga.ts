import { all, takeEvery } from "redux-saga/effects";
import {
  addPermission,
  fetchPermissions,
  fetchPermission,
  updatePermission,
  updateAuthority,
  fetchAuthorities,
  addAuthority,
  fetchAuthority,
  updateUserAuthority
} from "./slice";
import {
  addPermissionHandler,
  fetchPermissionHandler,
  fetchPermissionsHandler,
  updatePermissionHandler
} from "@store/role/saga-handler/permission.generator";
import {
  addAuthorityHandler,
  fetchAuthoritiesHandler,
  fetchAuthorityHandler,
  updateAuthorityHandler,
  updateUserAuthorityHandler
} from "@store/role/saga-handler/authority.generator";

export function* roleSaga() {
  yield all([
    takeEvery(addPermission, addPermissionHandler),
    takeEvery(fetchPermissions, fetchPermissionsHandler),
    takeEvery(fetchPermission, fetchPermissionHandler),
    takeEvery(updatePermission, updatePermissionHandler),
    takeEvery(fetchAuthorities, fetchAuthoritiesHandler),
    takeEvery(addAuthority, addAuthorityHandler),
    takeEvery(fetchAuthority, fetchAuthorityHandler),
    takeEvery(updateAuthority, updateAuthorityHandler),
    takeEvery(updateUserAuthority, updateUserAuthorityHandler)
  ]);
}

export default roleSaga;
