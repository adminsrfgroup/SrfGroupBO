import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  deleteSuccessAdvertisingOffer,
  entitiesAdvertisingOffer,
  fetchAdvertisings,
  loadingEntitiesAdvertisingOffer,
  removeAdvertisingOffer,
  resetAdvertisings
} from "@store/advertising/slice";

export const useAdvertising = () => {
  const dispatch = useDispatch();
  const entitiesAdvertisingOfferSelector =
    useSelector(entitiesAdvertisingOffer) ?? [];
  const loadingEntitiesAdvertisingOfferSelector =
    useSelector(loadingEntitiesAdvertisingOffer) ?? false;
  const deleteSuccessAdvertisingSelector =
    useSelector(deleteSuccessAdvertisingOffer) ?? false;

  const fetchAllAdvertisings = useCallback(
    (arg?: { page: number; size: number; queryParams: string }) => {
      return dispatch(
        fetchAdvertisings({
          page: arg?.page,
          size: arg?.size,
          queryParams: arg?.queryParams
        })
      );
    },
    [dispatch]
  );

  const deleteAdvertising = useCallback(
    (arg?: { id: number }) => {
      console.log("id = ", arg?.id);
      return dispatch(
        removeAdvertisingOffer({
          id: arg?.id
        })
      );
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    return dispatch(resetAdvertisings({}));
  }, [dispatch]);

  return {
    fetchAllAdvertisings,
    entitiesAdvertisingOfferSelector,
    loadingEntitiesAdvertisingOfferSelector,
    deleteSuccessAdvertisingSelector,
    deleteAdvertising,
    reset
  } as const;
};
