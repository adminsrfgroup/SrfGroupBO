import { useDispatch, useSelector } from "react-redux";
import {
  addOrganigramme,
  entityOrganigramme,
  fetchOrganigramme,
  loadingOrganigramme
} from "@store/user/slice";
import { useCallback } from "react";

const defaultValueDataSource = {
  id: "n1",
  name: "Taki Eddine Rahal",
  title: "CEO",
  children: []
};

export const useAdmin = () => {
  const dispatch = useDispatch();

  const entityOrganigrammeSelector =
    useSelector(entityOrganigramme) ?? defaultValueDataSource;
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
