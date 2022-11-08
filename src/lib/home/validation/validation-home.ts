import * as Yup from "yup";

export const initialValuesTopHomeSlidesImage = {
  descriptionAr: "",
  descriptionFr: "",
  descriptionEn: ""
};

export const validationSchemaTopHomeSlidesImage = Yup.object({
  descriptionAr: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits"),
  descriptionFr: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits"),
  descriptionEn: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits")
});

export const initialValuesPostHomeFeature = {
  descriptionAr: "",
  descriptionFr: "",
  descriptionEn: ""
};

export const validationSchemaPostHomeFeature = Yup.object({
  descriptionAr: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits"),
  descriptionFr: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits"),
  descriptionEn: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(5000, "Max 5000 digits")
});
