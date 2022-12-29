import SideBar from "@components/SideBar";
import Header from "@components/Header";
import React from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { usePermission } from "../../../lib/role/hooks/usePermission";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

function ListPermissions() {
  const router = useRouter();
  const {
    fetchAllPermissions,
    loadingEntitiesPermissionSelector,
    entitiesPermissionSelector,
    resetModulePermission
  } = usePermission();
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");

  const [filters, setFilters] = React.useState({
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    pathApi: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS }
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

  React.useEffect(() => {
    resetModulePermission();
    fetchAllPermissions({
      page: 0,
      size: 20,
      queryParams: ""
    });
  }, []);

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">List of users</h5>
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

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"Update"}
          className={"p-button-info"}
          onClick={() => redirect("/role/update-permission/" + rowData.id)}
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
          <div className="flex-1">List of Permissions</div>
          <div className="">
            <Button
              label="Add new Permission"
              className="p-button-link"
              onClick={() => redirect("/role/add-permission")}
            />
          </div>
        </div>

        <div className="card">
          <DataTable
            value={entitiesPermissionSelector}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loadingEntitiesPermissionSelector}
            responsiveLayout="scroll"
            globalFilterFields={["id", "name", "pathApi", "description"]}
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
              header="PathApi"
              filterField="pathApi"
              field="pathApi"
              filter
              filterPlaceholder="Search by pathApi"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Description"
              filterField="description"
              style={{ minWidth: "12rem" }}
              field="description"
              filter
              filterPlaceholder="Search by description"
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
export default ListPermissions;
