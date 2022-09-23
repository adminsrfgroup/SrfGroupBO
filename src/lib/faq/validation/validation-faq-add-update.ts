import * as Yup from "yup";

export const initialValuesFaqAddUpdate = {
  questionAr: "",
  questionFr: "",
  questionEn: "",
  responseAr: "",
  responseFr: "",
  responseEn: ""
};

export const validationSchemaFaqAddUpdaten = Yup.object({
  questionAr: Yup.string()
    .required("Question Ar is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  questionFr: Yup.string()
    .required("Question Fr is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  questionEn: Yup.string()
    .required("Question En is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  responseAr: Yup.string()
    .required("Response Ar is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  responseFr: Yup.string()
    .required("Response Fr is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits"),
  responseEn: Yup.string()
    .required("Response En is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits")
});
