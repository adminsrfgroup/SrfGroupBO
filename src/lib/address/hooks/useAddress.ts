import { useDispatch, useSelector } from "react-redux";
import {
  entitiesAddress,
  fetchAddress,
  importAddress,
  importSuccessAddress,
  resetAddress
} from "@store/address/slice";
import { useCallback } from "react";

export const useAddress = () => {
  const dispatch = useDispatch();

  const entitiesAddressSelector = useSelector(entitiesAddress) ?? [];
  const importSuccessAddressSelector =
    useSelector(importSuccessAddress) ?? false;

  const fetchAllAddresses = useCallback(
    (arg?: { page: number; size: number; queryParams: string }) => {
      return dispatch(
        fetchAddress({
          page: arg?.page,
          size: arg?.size,
          queryParams: arg?.queryParams
        })
      );
    },
    [dispatch]
  );

  const importAllAddresses = useCallback(() => {
    return dispatch(importAddress({}));
  }, [dispatch]);

  const resetAllAddresses = useCallback(() => {
    return dispatch(resetAddress({}));
  }, [dispatch]);

  return {
    entitiesAddressSelector,
    importSuccessAddressSelector,
    fetchAllAddresses,
    importAllAddresses,
    resetAllAddresses
  } as const;
};
