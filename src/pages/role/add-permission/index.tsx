import SideBar from "@components/SideBar";
import Header from "@components/Header";
import React from "react";
import { useFormik } from "formik";
import {
  initialValuesAddPermission,
  validationSchemaAddPermission
} from "../../../lib/role/validation/role_validation";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { usePermission } from "../../../lib/role/hooks/usePermission";
import { useRouter } from "next/router";
import { TreeSelect } from "primereact/treeselect";
import TreeNode from "primereact/treenode";
import { LIST_PERMISSIONS } from "../../../constants/authorities";

const initialValues = initialValuesAddPermission;
function AddPermission() {
  const [selectedNodeKey, setSelectedNodeKey] = React.useState(null);
  const [nodes, setNodes] = React.useState<TreeNode[]>([]);
  const router = useRouter();
  const { addNewPermission, addSuccessPermissionSelector } = usePermission();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddPermission,
    onSubmit: (values: any) => {
      addNewPermission(values);
    }
  });

  React.useEffect(() => {
    LIST_PERMISSIONS.map((permission) => {
      setNodes((prevState) => [
        ...prevState,
        {
          key: permission,
          data: permission,
          label: permission,
          icon: "",
          children: []
        }
      ]);
    });
  }, []);

  React.useEffect(() => {
    if (addSuccessPermissionSelector) {
      router.push("/role/list-permissions");
    }
  }, [addSuccessPermissionSelector]);

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

  const handleChangeName = (event: any) => {
    console.log("event.value ", event.value);
    setSelectedNodeKey(event.value);
    formik.setFieldValue("name", event.value);
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
                    htmlFor="name"
                    className={classNames({
                      "p-error": isFormFieldValid("name")
                    })}>
                    Name *
                  </label>
                  <TreeSelect
                    value={selectedNodeKey}
                    onChange={(e: any) => handleChangeName(e)}
                    options={nodes}
                    filter
                    placeholder="Select a role"></TreeSelect>
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
                    label="Add Permission"
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
export default AddPermission;
