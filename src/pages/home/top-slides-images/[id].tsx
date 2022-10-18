import React from "react";
import { useRouter } from "next/router";
import AddTopSlidesImages from "./add-top-slides-images";

export default function UpdateTopSlidesImages() {
  const router = useRouter();
  const { id } = router.query;

  return id ? <AddTopSlidesImages id={id} /> : null;
}
