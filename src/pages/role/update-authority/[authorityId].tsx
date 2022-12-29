import SideBar from "@components/SideBar";
import Header from "@components/Header";
import React from "react";
import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import {
  initialValuesAddAuthority,
  validationSchemaAddAuthority
} from "../../../lib/role/validation/role_validation";
import { usePermission } from "../../../lib/role/hooks/usePermission";
import { ToggleButton } from "primereact/togglebutton";
import { Divider } from "primereact/divider";
import { useAuthority } from "../../../lib/role/hooks/useAuthority";
import { useRouter } from "next/router";

const initialValues = initialValuesAddAuthority;

function UpdateRole() {
  const router = useRouter();
  const { authorityId } = router.query;

  const {
    updateSuccessAuthoritySelector,
    fetchDetailsAuthority,
    entityAuthoritiesSelector,
    updateSelectAuthority
  } = useAuthority();
  const { fetchAllPermissions, entitiesPermissionSelector } = usePermission();
  const [listPermission, setListPermissions] = React.useState<any[]>([]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddAuthority,
    onSubmit: (values: any) => {
      const entity = {
        ...values,
        id: authorityId,
        permissions: listPermission.filter((item) => item.checked)
      };
      console.log("entity ", entity);
      updateSelectAuthority(entity);
    }
  });

  React.useEffect(() => {
    if (updateSuccessAuthoritySelector) {
      router.push("/role/list-roles");
    }
  }, [updateSuccessAuthoritySelector]);

  React.useEffect(() => {
    if (entitiesPermissionSelector?.length) {
      console.log(
        "entityAuthoritiesSelector ",
        entityAuthoritiesSelector?.permissions
      );
      entitiesPermissionSelector.map((permission: any) => {
        console.log("permission ", permission);
        setListPermissions((prevState) => [
          ...prevState,
          {
            ...permission,
            checked: entityAuthoritiesSelector?.permissions?.find(
              (item: any) => item.id == permission.id
            )
          }
        ]);
      });
    }
  }, [entitiesPermissionSelector]);

  React.useEffect(() => {
    if (authorityId) {
      fetchDetailsAuthority({ id: authorityId.toString() });
    }
  }, [authorityId]);

  React.useEffect(() => {
    if (entityAuthoritiesSelector?.id) {
      formik.setFieldValue("name", entityAuthoritiesSelector?.name);

      fetchAllPermissions({
        page: 0,
        size: 100,
        queryParams: ""
      });
    }
  }, [entityAuthoritiesSelector]);

  const isFormFieldValid = (name: "id" | "name") =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: "id" | "name") => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const changeHandler = (event: any, permission: any) => {
    setListPermissions((prevState) => {
      const data = [...prevState];
      const indexOfTodo = data.findIndex((item) => item.id === permission.id);
      data[indexOfTodo] = {
        ...data[indexOfTodo],
        checked: event.value
      };
      return data;
    });
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="flex mb-3">
              <div className="flex-1">
                <h5>Add new Role</h5>
              </div>
              <div className="">
                <Button
                  type="submit"
                  label="Update New Role"
                  className="mt-2"
                />
              </div>
            </div>

            <div className="card">
              <div className="formgrid grid">
                <div className="field col-4 col-offset-2 mr-3">
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
                <div className="field col-4 ml-3">
                  {listPermission?.map((permission: any, index: number) => (
                    <div key={index}>
                      <h5>{permission.name}</h5>
                      <ToggleButton
                        checked={permission.checked}
                        onChange={(e: any) => changeHandler(e, permission)}
                        onIcon="pi pi-check"
                        offIcon="pi pi-times"
                        className="w-full sm:w-10rem"
                        aria-label="Confirmation"
                      />
                      <Divider />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
export default UpdateRole;
