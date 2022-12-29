import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  addPermission,
  addSuccessPermission,
  entitiesPermission,
  entityPermission,
  fetchPermission,
  fetchPermissions,
  loadingEntitiesPermission,
  loadingPermission,
  resetPermission,
  updatePermission,
  updateSuccessPermission
} from "@store/role/slice";

export const usePermission = () => {
  const dispatch = useDispatch();
  const addSuccessPermissionSelector =
    useSelector(addSuccessPermission) ?? false;
  const updateSuccessPermissionSelector =
    useSelector(updateSuccessPermission) ?? false;
  const loadingEntitiesPermissionSelector =
    useSelector(loadingEntitiesPermission) ?? false;
  const entitiesPermissionSelector = useSelector(entitiesPermission) ?? [];
  const loadingPermissionSelector = useSelector(loadingPermission) ?? false;
  const entityPermissionSelector = useSelector(entityPermission) ?? {};

  const addNewPermission = useCallback(
    (arg?: any) => {
      return dispatch(addPermission(arg));
    },
    [dispatch]
  );

  const updateSelectPermission = useCallback(
    (arg?: any) => {
      return dispatch(updatePermission(arg));
    },
    [dispatch]
  );

  const fetchAllPermissions = useCallback(
    (arg?: { page: number; size: number; queryParams: string }) => {
      return dispatch(
        fetchPermissions({
          page: arg?.page,
          size: arg?.size,
          queryParams: arg?.queryParams
        })
      );
    },
    [dispatch]
  );

  const fetchDetailsPermission = useCallback(
    (arg?: { id: string }) => {
      return dispatch(
        fetchPermission({
          id: arg?.id
        })
      );
    },
    [dispatch]
  );

  const resetModulePermission = useCallback(() => {
    return dispatch(resetPermission({}));
  }, [dispatch]);

  return {
    addNewPermission,
    addSuccessPermissionSelector,
    fetchAllPermissions,
    entitiesPermissionSelector,
    loadingEntitiesPermissionSelector,
    fetchDetailsPermission,
    loadingPermissionSelector,
    entityPermissionSelector,
    updateSuccessPermissionSelector,
    updateSelectPermission,
    resetModulePermission
  } as const;
};
