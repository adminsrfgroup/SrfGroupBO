import { useDispatch, useSelector } from "react-redux";
import {
  addCgu,
  addSuccessCgu,
  entityCgu,
  fetchCgu,
  loadingCgu,
  updateCgu,
  updateSuccessCgu
} from "@store/cgu/slice";
import { useCallback } from "react";

export const useCgu = () => {
  const dispatch = useDispatch();
  const loadingCguSelector = useSelector(loadingCgu) ?? false;
  const addSuccessCguSelector = useSelector(addSuccessCgu) ?? false;
  const updateSuccessCguSelector = useSelector(updateSuccessCgu) ?? false;
  const entityCguSelector = useSelector(entityCgu) ?? {};

  const fetchListCgu = useCallback(() => {
    return dispatch(fetchCgu({}));
  }, [dispatch]);

  const addNewCgu = useCallback(
    (arg?: any) => {
      return dispatch(addCgu(arg));
    },
    [dispatch]
  );

  const updateNewCgu = useCallback(
    (arg?: any) => {
      return dispatch(updateCgu(arg));
    },
    [dispatch]
  );

  return {
    loadingCguSelector,
    addSuccessCguSelector,
    entityCguSelector,
    fetchListCgu,
    addNewCgu,
    updateNewCgu,
    updateSuccessCguSelector
  } as const;
};
