import { useRouter } from "next/router";
import React from "react";
import { usePermission } from "../../../lib/role/hooks/usePermission";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import {
  initialValuesAddPermission,
  validationSchemaAddPermission
} from "../../../lib/role/validation/role_validation";

const initialValues = initialValuesAddPermission;
function UserDetails() {
  const router = useRouter();
  const { permissionId } = router.query;

  const {
    fetchDetailsPermission,
    entityPermissionSelector,
    updateSuccessPermissionSelector,
    updateSelectPermission
  } = usePermission();

  React.useEffect(() => {
    if (permissionId) {
      fetchDetailsPermission({ id: permissionId as string });
    }
  }, [permissionId]);

  React.useEffect(() => {
    if (entityPermissionSelector?.id) {
      formik.setFieldValue("id", entityPermissionSelector?.id);
      formik.setFieldValue("name", entityPermissionSelector?.name);
      formik.setFieldValue("pathApi", entityPermissionSelector?.pathApi);
      formik.setFieldValue(
        "description",
        entityPermissionSelector?.description
      );
    }
  }, [entityPermissionSelector]);
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddPermission,
    onSubmit: (values: any) => {
      console.log("values ", values);
      updateSelectPermission(values);
    }
  });

  React.useEffect(() => {
    console.log(
      "updateSuccessPermissionSelector ",
      updateSuccessPermissionSelector
    );
    if (updateSuccessPermissionSelector) {
      router.push("/role/list-permissions");
    }
  }, [updateSuccessPermissionSelector]);

  const isFormFieldValid = (name: "id" | "name" | "pathApi" | "description") =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (
    name: "id" | "name" | "pathApi" | "description"
  ) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="card">
              <h5>Add new Permission</h5>
            </div>

            <div className="card">
              <div className="formgrid grid">
                <div className="field col-6 col-offset-3">
                  <label
                    htmlFor="id"
                    className={classNames({
                      "p-error": isFormFieldValid("id")
                    })}>
                    Name *
                  </label>
                  <InputText
                    id="id"
                    name="id"
                    disabled={true}
                    aria-describedby="id-help"
                    className="p-inputtext-sm block"
                    value={formik.values.id || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("id")}
                </div>
                <div className="field col-6 col-offset-3">
                  <label
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name")
                    })}>
                    Name *
                  </label>
                  <InputText
                    id="name"
                    name="name"
                    readOnly={true}
                    aria-describedby="name-help"
                    className="p-inputtext-sm block"
                    value={formik.values.name || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("name")}
                </div>
                <div className="field col-6 col-offset-3">
                  <label
                    htmlFor="pathApi"
                    className={classNames({
                      "p-error": isFormFieldValid("pathApi")
                    })}>
                    PathApi *
                  </label>
                  <InputText
                    id="pathApi"
                    name="pathApi"
                    aria-describedby="pathApi-help"
                    className="p-inputtext-sm block"
                    value={formik.values.pathApi || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("pathApi")}
                </div>

                <div className="field col-6 col-offset-3">
                  <label
                    htmlFor="pathApi"
                    className={classNames({
                      "p-error": isFormFieldValid("pathApi")
                    })}>
                    Description *
                  </label>
                  <InputTextarea
                    id="description"
                    name="description"
                    aria-describedby="description-help"
                    className="p-inputtext-sm block"
                    rows={3}
                    value={formik.values.description || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("description")}
                </div>
                <div className="field col-6 col-offset-3">
                  <Button
                    type="submit"
                    label="Update Permission"
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default UserDetails;
