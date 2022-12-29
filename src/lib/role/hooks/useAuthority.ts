import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  addAuthority,
  addSuccessAuthority,
  entitiesAuthorities,
  entityAuthorities,
  fetchAuthorities,
  fetchAuthority,
  loadingEntitiesAuthorities,
  resetAuthority,
  updateAuthority,
  updateSuccessAuthority,
  updateSuccessUserAuthority,
  updateUserAuthority
} from "@store/role/slice";

export const useAuthority = () => {
  const dispatch = useDispatch();

  const addSuccessAuthoritySelector = useSelector(addSuccessAuthority) ?? false;
  const updateSuccessUserAuthoritySelector =
    useSelector(updateSuccessUserAuthority) ?? false;
  const updateSuccessAuthoritySelector =
    useSelector(updateSuccessAuthority) ?? false;
  const loadingEntitiesAuthoritiesSelector =
    useSelector(loadingEntitiesAuthorities) ?? false;
  const entitiesAuthoritiesSelector = useSelector(entitiesAuthorities) ?? [];
  const entityAuthoritiesSelector = useSelector(entityAuthorities) ?? {};

  const fetchAllPermissions = useCallback(
    (arg?: { page: number; size: number; queryParams: string }) => {
      return dispatch(
        fetchAuthorities({
          page: arg?.page,
          size: arg?.size,
          queryParams: arg?.queryParams
        })
      );
    },
    [dispatch]
  );

  const resetModuleAuthority = useCallback(() => {
    return dispatch(resetAuthority({}));
  }, [dispatch]);

  const addNewAuthority = useCallback(
    (arg?: any) => {
      return dispatch(addAuthority(arg));
    },
    [dispatch]
  );

  const updateSelectAuthority = useCallback(
    (arg?: any) => {
      return dispatch(updateAuthority(arg));
    },
    [dispatch]
  );

  const fetchDetailsAuthority = useCallback(
    (arg?: { id: string }) => {
      return dispatch(
        fetchAuthority({
          id: arg?.id
        })
      );
    },
    [dispatch]
  );

  const updateSelectUserAuthority = useCallback(
    (arg?: any) => {
      return dispatch(updateUserAuthority(arg));
    },
    [dispatch]
  );

  return {
    fetchAllPermissions,
    loadingEntitiesAuthoritiesSelector,
    entitiesAuthoritiesSelector,
    resetModuleAuthority,
    addNewAuthority,
    addSuccessAuthoritySelector,
    fetchDetailsAuthority,
    entityAuthoritiesSelector,
    updateSelectAuthority,
    updateSuccessAuthoritySelector,
    updateSelectUserAuthority,
    updateSuccessUserAuthoritySelector
  } as const;
};
