import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  initialValuesSignIn,
  validationSchemaSignIn
} from "../../lib/signin/validation/validation-signin";
// import {useTranslation} from "react-i18next";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import {
  /*allLocaleSelector,*/ allLoginSelector,
  allSessionSelector,
  sessionUser,
  loginUser
} from "@store/user/slice";

const initialValues = initialValuesSignIn;

export default function SignIn() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { /*loading, */ token } = useSelector(allLoginSelector);
  const { /*isAuthenticated,*/ oneSignalId } = useSelector(allSessionSelector);

  React.useEffect(() => {
    if (token) {
      dispatch(sessionUser({}));
      router.push("/dashboard");
    }
  }, [token]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaSignIn,
    onSubmit: (values) => {
      dispatch(
        loginUser({
          email: values.email.toString(),
          password: values.password.toString(),
          oneSignalId: oneSignalId,
          rememberMe: true
        })
      );
      // props.login(values.email.toString(), values.password.toString(), props.oneSignalId, true);
    }
  });

  const isFormFieldValid = (name: "email" | "password") =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name: "email" | "password") => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="container-signin">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">LogIn</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={classNames({
                    "p-invalid": isFormFieldValid("email")
                  })}
                />
                <label
                  htmlFor="email"
                  className={classNames({
                    "p-error": isFormFieldValid("email")
                  })}>
                  Email*
                </label>
              </span>
              {getFormErrorMessage("email")}
            </div>
            <div className="field">
              <span className="p-float-label">
                <Password
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  toggleMask
                  className={classNames({
                    "p-invalid": isFormFieldValid("password")
                  })}
                  header={passwordHeader}
                  footer={passwordFooter}
                />
                <label
                  htmlFor="password"
                  className={classNames({
                    "p-error": isFormFieldValid("password")
                  })}>
                  Password*
                </label>
              </span>
              {getFormErrorMessage("password")}
            </div>
            <div className="field-checkbox">
              <Checkbox
                inputId="accept"
                name="accept"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
              <label htmlFor="accept">Remember Me</label>
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </div>
    </div>
  );
}
