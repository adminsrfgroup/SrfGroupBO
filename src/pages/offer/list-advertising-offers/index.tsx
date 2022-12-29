import SideBar from "@components/SideBar";
import Header from "@components/Header";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Footer from "@components/Footer";
import React from "react";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { useAdvertising } from "../../../lib/advertising/hooks/use-advertising";
import { Dialog } from "primereact/dialog";

function ListAdvertisingOffers() {
  const [
    openRemoveAdvertisingModal,
    setOpenRemoveAdvertisingModal
  ] = React.useState(false);
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");
  const [filters, setFilters] = React.useState({
    id: { value: null, matchMode: FilterMatchMode.CONTAINS },
    startDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    endDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    module: { value: null, matchMode: FilterMatchMode.CONTAINS },
    available: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [idDeleteAdvertising, setIdDeleteAdvertising] = React.useState(-1);

  const {
    loadingEntitiesAdvertisingOfferSelector,
    entitiesAdvertisingOfferSelector,
    fetchAllAdvertisings,
    deleteSuccessAdvertisingSelector,
    deleteAdvertising,
    reset
  } = useAdvertising();

  React.useEffect(() => {
    reset();
    fetchAllAdvertisings({
      page: 0,
      size: 20,
      queryParams: ""
    });
  }, []);

  React.useEffect(() => {
    if (deleteSuccessAdvertisingSelector) {
      reset();
      onHideRemoveAdvertisingModal();
      fetchAllAdvertisings({
        page: 0,
        size: 20,
        queryParams: ""
      });
    }
  }, [deleteSuccessAdvertisingSelector]);

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    console.log("value ", value);
    const _filters = { ...filters };
    _filters["startDate"].value = value;

    setFilters(_filters);
    setGlobalFilterValue2(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">List of advertising</h5>
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

  const deleteAdvertisingAction = (id: number) => {
    setIdDeleteAdvertising(id);
    setOpenRemoveAdvertisingModal(true);
  };

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <span className="p-buttonset">
          <Button label="View" className={"p-button-info"} />
          {rowData.available ? (
            <Button
              label="Remove available"
              className={"p-button-danger"}
              onClick={() => deleteAdvertisingAction(rowData.id)}
            />
          ) : null}
        </span>
      </React.Fragment>
    );
  };

  const representativeBodyAvailableTemplate = (rowData: any) => {
    return <React.Fragment>{rowData.available.toString()}</React.Fragment>;
  };

  const renderFooterRemoveAdvertisingModal = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHideRemoveAdvertisingModal()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => deleteAdvertising({ id: idDeleteAdvertising })}
          autoFocus
        />
      </div>
    );
  };

  const onHideRemoveAdvertisingModal = () => {
    setOpenRemoveAdvertisingModal(false);
  };
  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div className="card">
          <DataTable
            value={entitiesAdvertisingOfferSelector}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loadingEntitiesAdvertisingOfferSelector}
            responsiveLayout="scroll"
            globalFilterFields={[
              "id",
              "startDate",
              "endDate",
              "module",
              "available"
            ]}
            header={renderHeader}
            emptyMessage="No offer found.">
            <Column
              header="ID"
              filterField="id"
              field="id"
              filter
              filterPlaceholder="Search by id"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Start Date"
              filterField="startDate"
              field="startDate"
              filter
              filterPlaceholder="Search by startDate"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="End Date"
              filterField="endDate"
              field="endDate"
              filter
              filterPlaceholder="Search by endDate"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Module"
              filterField="module"
              style={{ minWidth: "12rem" }}
              field="module"
              filter
              filterPlaceholder="Search by module"
            />
            <Column
              header="Available"
              filterField="available"
              style={{ minWidth: "12rem" }}
              field="available"
              filter
              filterPlaceholder="Search by available"
              body={representativeBodyAvailableTemplate}
            />
            <Column
              header="Activity"
              sortable
              body={representativeBodyAcitvityTemplate}
              style={{ minWidth: "12rem" }}
            />
          </DataTable>
        </div>

        <Dialog
          header="Remove advertising"
          visible={openRemoveAdvertisingModal}
          footer={renderFooterRemoveAdvertisingModal()}
          onHide={() => onHideRemoveAdvertisingModal()}>
          <p>Are you sur to block this user ?</p>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
export default ListAdvertisingOffers;
