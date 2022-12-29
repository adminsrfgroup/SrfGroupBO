import * as Yup from "yup";

export const initialValuesCguAddUpdate = {
  contentAr: "",
  contentFr: "",
  contentEn: ""
};

export const validationSchemaCguAddUpdaten = Yup.object({
  contentAr: Yup.string()
    .required("Content Ar is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits"),
  contentFr: Yup.string()
    .required("Content Fr is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits"),
  contentEn: Yup.string()
    .required("Content En is required")
    .min(5, "Min 5 digits")
    .max(50000, "Max 200 digits")
});
