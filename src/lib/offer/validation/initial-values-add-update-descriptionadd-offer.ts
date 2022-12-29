import * as Yup from "yup";

export const initialValuesAddUpdateDescriptionAddOffer = {
  descriptionAr: "",
  descriptionFr: "",
  descriptionEn: ""
};

export const validationSchemaAddUpdateDescriptionAddOffer = Yup.object({
  descriptionAr: Yup.string()
    .required("Content Ar is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits"),
  descriptionFr: Yup.string()
    .required("Content Fr is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits"),
  descriptionEn: Yup.string()
    .required("Content En is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits")
});

export const initialValuesPubOffer = {
  startDate: "",
  endDate: "",
  module: ""
};

export const validationSchemaPubOffer = Yup.object({
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
  module: Yup.string().required("Required")
});
