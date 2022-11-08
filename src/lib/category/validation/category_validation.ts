import * as Yup from "yup";

export const initialValuesAddCategory = {
  id: undefined,
  titleAr: "",
  titleFr: "",
  titleEn: "",
  imageContent: ""
};

export const validationSchemaAddCategory = Yup.object({
  id: Yup.string().nullable().notRequired(),
  titleAr: Yup.string().required("titleAr is required"),
  titleFr: Yup.string().required("titleFr is required"),
  titleEn: Yup.string().required("titleEn is required"),
  imageContent: Yup.string().required("image is required")
});
