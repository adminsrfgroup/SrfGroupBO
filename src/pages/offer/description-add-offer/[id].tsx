import React from "react";
import { useRouter } from "next/router";
import AddUpdateDescriptionNewOffer from "./add-update-description-new-offer";

export default function UpdateDescriptionNewOffer() {
  const router = useRouter();
  const { id } = router.query;

  return id ? <AddUpdateDescriptionNewOffer id={id} /> : null;
}
