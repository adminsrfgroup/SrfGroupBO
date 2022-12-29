import { createSlice, Slice } from "@reduxjs/toolkit";
import { initialState } from "@store/role/initial.state";
import permissionReducer from "@store/role/reducers/permission.reducer";
import authorityReducer from "@store/role/reducers/authority.reducer";

export const ROLE_KEY_IN_STORE = "role";

export const roleSlice: Slice = createSlice({
  name: ROLE_KEY_IN_STORE,
  initialState: initialState,
  reducers: {
    ...permissionReducer,
    ...authorityReducer
  }
});

export const {
  //? ********************| FETCH PERMISSIONS ACTIONS |*******************/
  fetchPermissions,
  fetchPermissionsSuccess,
  fetchPermissionsFailure,

  //? ********************| ADD PERMISSION ACTIONS |*******************/
  addPermission,
  addPermissionSuccess,
  addPermissionFailure,

  //? ********************| FETCH PERMISSION ACTIONS |*******************/
  fetchPermission,
  fetchPermissionSuccess,
  fetchPermissionFailure,

  resetPermission,

  //? ********************| UPDATE PERMISSION ACTIONS |*******************/
  updatePermission,
  updatePermissionSuccess,
  updatePermissionFailure,

  //? ********************| FETCH AUTHORITIES ACTIONS |*******************/
  fetchAuthorities,
  fetchAuthoritiesSuccess,
  fetchAuthoritiesFailure,

  //? ********************| ADD AUTHORITY ACTIONS |*******************/
  addAuthority,
  addAuthoritySuccess,
  addAuthorityFailure,

  //? ********************| UPDATE AUTHORITY ACTIONS |*******************/
  updateAuthority,
  updateAuthoritySuccess,
  updateAuthorityFailure,

  //? ********************| FETCH AUTHORITY ACTIONS |*******************/
  fetchAuthority,
  fetchAuthoritySuccess,
  fetchAuthorityFailure,

  //? ********************| UPDATE AUTHORITY FOR USER USER ACTIONS |*******************/
  updateUserAuthority,
  updateUserAuthoritySuccess,
  updateUserAuthorityFailure,

  resetAuthority
} = roleSlice.actions;

//? ********************| FETCH PERMISSION SELECTORS |*******************/
export const addSuccessPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.addSuccess;
export const entitiesPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.entities;
export const loadingEntitiesPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.loadingEntities;
export const loadingPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.loading;
export const entityPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.entity;
export const updateSuccessPermission = (state: any) =>
  state[ROLE_KEY_IN_STORE].permission.updateSuccess;

//? ********************| FETCH AUTHORITY SELECTORS |*******************/
export const addSuccessAuthority = (state: any) =>
  state[ROLE_KEY_IN_STORE].authority.addSuccess;
export const entitiesAuthorities = (state: any) =>
  state[ROLE_KEY_IN_STORE].authority.entities;
export const loadingEntitiesAuthorities = (state: any) =>
  state[ROLE_KEY_IN_STORE].authority.loadingEntities;
export const entityAuthorities = (state: any) =>
  state[ROLE_KEY_IN_STORE].authority.entity;
export const updateSuccessAuthority = (state: any) =>
  state[ROLE_KEY_IN_STORE].authority.updateSuccess;

//? ********************| FETCH USER AUTHORITY SELECTORS |*******************/
export const updateSuccessUserAuthority = (state: any) =>
  state[ROLE_KEY_IN_STORE].userAuthority.updateSuccess;
