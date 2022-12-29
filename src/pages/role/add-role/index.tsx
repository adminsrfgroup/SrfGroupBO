import SideBar from "@components/SideBar";
import Header from "@components/Header";
import React from "react";
import { classNames } from "primereact/utils";
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
import { TreeSelect } from "primereact/treeselect";
import TreeNode from "primereact/treenode";
import { LIST_AUTHORITIES } from "../../../constants/authorities";

const initialValues = initialValuesAddAuthority;

function AddRole() {
  const [selectedNodeKey, setSelectedNodeKey] = React.useState(null);
  const [nodes, setNodes] = React.useState<TreeNode[]>([]);
  const router = useRouter();
  const { addNewAuthority, addSuccessAuthoritySelector } = useAuthority();
  const { fetchAllPermissions, entitiesPermissionSelector } = usePermission();
  const [listPermission, setListPermissions] = React.useState<any[]>([]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddAuthority,
    onSubmit: (values: any) => {
      const entity = {
        ...values,
        permissions: listPermission.filter((item) => item.checked)
      };
      console.log("entity ", entity);
      addNewAuthority(entity);
    }
  });

  React.useEffect(() => {
    if (addSuccessAuthoritySelector) {
      router.push("/role/list-roles");
    }
  }, [addSuccessAuthoritySelector]);

  React.useEffect(() => {
    fetchAllPermissions({
      page: 0,
      size: 20,
      queryParams: ""
    });

    LIST_AUTHORITIES.map((authority) => {
      setNodes((prevState) => [
        ...prevState,
        {
          key: authority,
          data: authority,
          label: authority,
          icon: "",
          children: []
        }
      ]);
    });
  }, []);

  React.useEffect(() => {
    if (entitiesPermissionSelector?.length) {
      entitiesPermissionSelector.map((permission: any) => {
        console.log("permission ", permission);
        setListPermissions((prevState) => [
          ...prevState,
          {
            ...permission,
            checked: false
          }
        ]);
      });
    }
  }, [entitiesPermissionSelector]);

  React.useEffect(() => {
    console.log("listPermission ", listPermission);
  }, [listPermission]);

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

  const handleChangeName = (event: any) => {
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
            <div className="flex mb-3">
              <div className="flex-1">
                <h5>Add new Role</h5>
              </div>
              <div className="">
                <Button type="submit" label="Add New Role" className="mt-2" />
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
                  {/*<InputText*/}
                  {/*  id="name"*/}
                  {/*  name="name"*/}
                  {/*  aria-describedby="name-help"*/}
                  {/*  className="p-inputtext-sm block"*/}
                  {/*  value={formik.values.name || ""}*/}
                  {/*  onChange={formik.handleChange}*/}
                  {/*/>*/}
                  <TreeSelect
                    value={selectedNodeKey}
                    onChange={(e: any) => handleChangeName(e)}
                    options={nodes}
                    filter
                    placeholder="Select a role"></TreeSelect>
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
export default AddRole;
