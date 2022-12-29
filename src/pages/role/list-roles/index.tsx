import SideBar from "@components/SideBar";
import Header from "@components/Header";
import React from "react";
import { useAuthority } from "../../../lib/role/hooks/useAuthority";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { usePermission } from "../../../lib/role/hooks/usePermission";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";

function ListRoles() {
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");

  const router = useRouter();
  const {
    fetchAllPermissions,
    resetModuleAuthority,
    entitiesAuthoritiesSelector,
    loadingEntitiesAuthoritiesSelector
  } = useAuthority();
  const { resetModulePermission } = usePermission();

  React.useEffect(() => {
    resetModuleAuthority();
    resetModulePermission();
    fetchAllPermissions({
      page: 0,
      size: 20,
      queryParams: ""
    });
  }, []);

  const [filters, setFilters] = React.useState({
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    console.log("value ", value);
    const _filters = { ...filters };
    _filters["name"].value = value;

    setFilters(_filters);
    setGlobalFilterValue2(value);
  };

  const redirect = (path: string) => {
    router.push(path);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue2}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const representativeBodyPermissionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        {rowData.permissions?.map((permission: any, index: number) => (
          <div key={index}>
            <h5>{permission.name}</h5>
            <Divider />
          </div>
        ))}
      </React.Fragment>
    );
  };

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"Update"}
          className={"p-button-info"}
          onClick={() => redirect("/role/update-authority/" + rowData.id)}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="flex mb-3">
          <div className="flex-1">
            <h5 className="m-0">List of roles</h5>
          </div>
          <div className="">
            <Button
              label="Add new Role"
              className="p-button-link"
              onClick={() => redirect("/role/add-role")}
            />
          </div>
        </div>

        <div className="card">
          <DataTable
            value={entitiesAuthoritiesSelector}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loadingEntitiesAuthoritiesSelector}
            responsiveLayout="scroll"
            globalFilterFields={["id", "name"]}
            header={renderHeader}
            emptyMessage="No customers found.">
            <Column
              header="Id"
              filterField="id"
              field="id"
              filter
              filterPlaceholder="Search by id"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Name"
              filterField="name"
              field="name"
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="List Permissions"
              sortable
              body={representativeBodyPermissionTemplate}
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Activity"
              sortable
              body={representativeBodyAcitvityTemplate}
              style={{ minWidth: "12rem" }}
            />
          </DataTable>
        </div>
      </main>
    </div>
  );
}
export default ListRoles;
