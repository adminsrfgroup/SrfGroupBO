import { useDispatch, useSelector } from "react-redux";
import {
  addOrganigramme,
  entityOrganigramme,
  fetchOrganigramme,
  loadingOrganigramme
} from "@store/user/slice";
import { useCallback } from "react";

export const useAdmin = () => {
  const dispatch = useDispatch();

  const entityOrganigrammeSelector = useSelector(entityOrganigramme) ?? {}; // {content: JSON.stringify(defaultValueDataSource)};
  const loadingOrganigrammeSelector = useSelector(loadingOrganigramme) ?? false;

  const getOrganigramme = useCallback(() => {
    return dispatch(fetchOrganigramme({}));
  }, [dispatch]);

  const createOrganigramme = useCallback(
    (ds: any) => {
      return dispatch(addOrganigramme(ds));
    },
    [dispatch]
  );

  return {
    entityOrganigrammeSelector,
    loadingOrganigrammeSelector,
    getOrganigramme,
    createOrganigramme
  } as const;
};
