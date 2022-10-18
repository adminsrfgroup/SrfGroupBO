import React from "react";
import { useRouter } from "next/router";
import AddFeatureHome from "./add-feature-home";

export default function UpdateFeatureHome() {
  const router = useRouter();
  const { id } = router.query;

  return id ? <AddFeatureHome id={id} /> : null;
}
