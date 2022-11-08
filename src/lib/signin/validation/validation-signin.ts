import * as Yup from "yup";

export const initialValuesSignIn = {
  email: "",
  password: "",
  rememberMe: false
};

export const validationSchemaSignIn = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(5, "Min 5 digits")
    .max(200, "Max 200 digits")
});
