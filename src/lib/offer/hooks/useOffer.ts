import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  entityPublicOffer,
  fetchDetailsPublicOffer,
  loadingPublicOffer
} from "@store/offer/slice";
import { IOffer } from "../../models/offer.model";
import {
  addAdvertisingOffer,
  addSuccessAdvertisingOffer
} from "@store/advertising/slice";

export const useOffer = () => {
  const dispatch = useDispatch();
  const loadingPublicOfferSelector = useSelector(loadingPublicOffer) ?? false;
  const entityPublicOfferSelector = useSelector(entityPublicOffer) ?? {};
  const addSuccessOfferSelector =
    useSelector(addSuccessAdvertisingOffer) ?? false;

  const fetchOfferDetails = useCallback(
    (arg?: { id: string }) => {
      return dispatch(fetchDetailsPublicOffer({ id: arg?.id }));
    },
    [dispatch]
  );

  const addOfferPub = useCallback(
    (arg?: {
      startDate: string;
      endDate: string;
      module: string;
      available: boolean;
      offer: IOffer;
    }) => {
      return dispatch(
        addAdvertisingOffer({
          startDate: arg?.startDate,
          endDate: arg?.endDate,
          module: arg?.module,
          available: arg?.available,
          offer: arg?.offer
        })
      );
    },
    [dispatch]
  );

  return {
    loadingPublicOfferSelector,
    entityPublicOfferSelector,
    fetchOfferDetails,
    addOfferPub,
    addSuccessOfferSelector
  } as const;
};
