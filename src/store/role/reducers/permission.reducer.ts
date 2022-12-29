import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@store/role/initial.state";
import { CommonPayload } from "@store/root-reducer";

const reducer = {
  fetchPermissions: (state: Draft<typeof initialState>) => {
    state.permission.loadingEntities = true;
  },
  fetchPermissionsSuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.permission.loadingEntities = false;
    state.permission.entities = action.payload?.content;
    state.permission.totalItems = action.payload?.totalElements;
    state.permission.totalPages = action.payload?.totalPages;
  },
  fetchPermissionsFailure: (state: any, action: PayloadAction) => {
    state.permission.loadingEntities = false;
    state.permission.errorMessage = action.payload;
  },

  fetchPermission: (state: Draft<typeof initialState>) => {
    state.permission.loading = true;
  },
  fetchPermissionSuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.permission.loading = false;
    state.permission.entity = action.payload;
  },
  fetchPermissionFailure: (state: any, action: PayloadAction) => {
    state.permission.loading = false;
    state.permission.errorMessage = action.payload;
  },

  updatePermission: (state: Draft<typeof initialState>) => {
    state.permission.loading = true;
    state.permission.updateSuccess = false;
  },
  updatePermissionSuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.permission.loading = false;
    state.permission.updateSuccess = true;
    state.permission.entity = action.payload;
  },
  updatePermissionFailure: (state: any, action: PayloadAction) => {
    state.permission.loading = false;
    state.permission.errorMessage = action.payload;
  },

  addPermission: (state: any) => {
    state.permission.loading = true;
    state.permission.addSuccess = false;
  },
  addPermissionSuccess: (state: any) => {
    state.permission.loading = false;
    state.permission.addSuccess = true;
  },
  addPermissionFailure: (state: any) => {
    state.permission.loading = false;
  },

  resetPermission: (state: any) => {
    state.permission = initialState.permission;
  }
};
export default reducer;
