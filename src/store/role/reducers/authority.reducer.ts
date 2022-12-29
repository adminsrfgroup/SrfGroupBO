import { Draft, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "@store/role/initial.state";
import { CommonPayload } from "@store/root-reducer";

const reducer = {
  fetchAuthorities: (state: Draft<typeof initialState>) => {
    state.authority.loadingEntities = true;
  },
  fetchAuthoritiesSuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.authority.loadingEntities = false;
    state.authority.entities = action.payload?.content;
    state.authority.totalItems = action.payload?.totalElements;
    state.authority.totalPages = action.payload?.totalPages;
  },
  fetchAuthoritiesFailure: (state: any, action: PayloadAction) => {
    state.authority.loadingEntities = false;
    state.authority.errorMessage = action.payload;
  },

  addAuthority: (state: Draft<typeof initialState>) => {
    state.authority.loading = true;
    state.authority.addSuccess = false;
  },
  addAuthoritySuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.authority.loading = false;
    state.authority.addSuccess = true;
    state.authority.entity = action.payload;
  },
  addAuthorityFailure: (state: any) => {
    state.authority.loading = false;
  },

  fetchAuthority: (state: Draft<typeof initialState>) => {
    state.authority.loading = true;
  },
  fetchAuthoritySuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.authority.loading = false;
    state.authority.entity = action.payload;
  },
  fetchAuthorityFailure: (state: any) => {
    state.authority.loading = false;
  },

  updateAuthority: (state: Draft<typeof initialState>) => {
    state.authority.loading = true;
    state.authority.updateSuccess = false;
  },
  updateAuthoritySuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.authority.loading = false;
    state.authority.updateSuccess = true;
    state.authority.entity = action.payload;
  },
  updateAuthorityFailure: (state: any) => {
    state.authority.loading = false;
  },

  updateUserAuthority: (state: Draft<typeof initialState>) => {
    state.userAuthority.loading = true;
    state.userAuthority.updateSuccess = false;
  },
  updateUserAuthoritySuccess: (
    state: Draft<typeof initialState>,
    action: PayloadAction<typeof CommonPayload>
  ) => {
    state.userAuthority.loading = false;
    state.userAuthority.updateSuccess = true;
    state.userAuthority.entity = action.payload;
  },
  updateUserAuthorityFailure: (state: any) => {
    state.userAuthority.loading = false;
  },

  resetAuthority: (state: any) => {
    state.authority = initialState.authority;
  }
};
export default reducer;
