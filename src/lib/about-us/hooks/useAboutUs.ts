import { useDispatch, useSelector } from "react-redux";
import {
  addAboutUs,
  addSuccessAboutUs,
  entitiesAboutUs,
  fetchAboutUs
} from "@store/about-us/slice";
import { useCallback } from "react";

export const useAboutUs = () => {
  const dispatch = useDispatch();
  const entitiesAboutUsSelector = useSelector(entitiesAboutUs) ?? [];
  const addSuccessAboutUsSelector = useSelector(addSuccessAboutUs) ?? false;

  const fetchAllAboutUs = useCallback(
    (arg?: { page: number; size: number; queryParams: string }) => {
      return dispatch(
        fetchAboutUs({
          page: arg?.page,
          size: arg?.size,
          queryParams: arg?.queryParams
        })
      );
    },
    [dispatch]
  );

  const addAboutUsAboutUs = useCallback(
    (arg?: any) => {
      return dispatch(addAboutUs(arg));
    },
    [dispatch]
  );

  return {
    entitiesAboutUsSelector,
    addSuccessAboutUsSelector,
    fetchAllAboutUs,
    addAboutUsAboutUs
  } as const;
};
