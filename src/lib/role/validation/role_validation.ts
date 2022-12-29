import * as Yup from "yup";

export const initialValuesAddPermission = {
  id: undefined,
  name: "",
  pathApi: "",
  description: ""
};

export const validationSchemaAddPermission = Yup.object({
  id: Yup.string().nullable().notRequired(),
  name: Yup.string().required("name is required"),
  pathApi: Yup.string().required("pathApi is required"),
  description: Yup.string().required("description is required")
});

export const initialValuesAddAuthority = {
  id: undefined,
  name: ""
};

export const validationSchemaAddAuthority = Yup.object({
  id: Yup.string().nullable().notRequired(),
  name: Yup.string().required("name is required")
});
