import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { entitiesOffer, fetchAllOffers } from "@store/offer/slice";
import { AllAppConfig } from "../../../config/all-config";
import { Button } from "primereact/button";
import { useRouter } from "next/router";

function ListOffers() {
  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesOfferSelector = useSelector(entitiesOffer) ?? [];
  const [offers, setOffers] = React.useState<any[]>([]);

  const [filters, setFilters] = React.useState({
    title: { value: null, matchMode: FilterMatchMode.CONTAINS },
    description: { value: null, matchMode: FilterMatchMode.CONTAINS },
    amount: { value: null, matchMode: FilterMatchMode.CONTAINS },
    dateCreated: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.CONTAINS },
    typeContactClient: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [loading, setLoading] = React.useState(true);
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    console.log("value ", value);
    const _filters = { ...filters };
    _filters["title"].value = value;

    setFilters(_filters);
    setGlobalFilterValue2(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h5 className="m-0">List of offers</h5>
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

  const representativeBodyTemplateDescription = (rowData: any) => {
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: rowData.description || ""
        }}></div>
    );
  };

  const header = renderHeader();

  React.useEffect(() => {
    setLoading(true);
    dispatch(
      fetchAllOffers({
        page: 0,
        size: AllAppConfig.OFFERS_PER_PAGE,
        queryParams: ""
      })
    );
  }, []);

  React.useEffect(() => {
    if (entitiesOfferSelector?.length) {
      setOffers(entitiesOfferSelector.slice());
    }
    setLoading(false);
  }, [entitiesOfferSelector]);

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"View"}
          className={"p-button-info"}
          onClick={() => router.push("/offer/offer-details/" + rowData.id)}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div className="card">
          <DataTable
            value={offers}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loading}
            responsiveLayout="scroll"
            globalFilterFields={[
              "title",
              "description",
              "amount",
              "typeOffer",
              "dateCreated",
              "address",
              "category",
              "typeContactClient"
            ]}
            header={header}
            emptyMessage="No offer found.">
            <Column
              header="Title"
              filterField="title"
              field="title"
              filter
              filterPlaceholder="Search by Title"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Description"
              filterField="description"
              field="description"
              filter
              filterPlaceholder="Search by description"
              body={representativeBodyTemplateDescription}
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Amount"
              filterField="amount"
              field="amount"
              filter
              filterPlaceholder="Search by amount"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="TypeOffer"
              filterField="typeOffer"
              style={{ minWidth: "12rem" }}
              field="typeOffer"
              filter
              filterPlaceholder="Search by typeOffer"
            />
            <Column
              header="DateCreated"
              filterField="dateCreated"
              style={{ minWidth: "12rem" }}
              field="dateCreated"
              filter
              filterPlaceholder="Search by dateCreated"
            />
            <Column
              header="Address"
              filterField="address"
              style={{ minWidth: "12rem" }}
              field="address.city"
              filter
              filterPlaceholder="Search by address"
            />
            <Column
              header="Category"
              filterField="category"
              style={{ minWidth: "12rem" }}
              field="category.titleFr"
              filter
              filterPlaceholder="Search by category"
            />
            <Column
              header="typeContactClient"
              filterField="typeContactClient"
              field="typeContactClient"
              filter
              filterPlaceholder="Search by typeContactClient"
              showFilterMenu={false}
              filterMenuStyle={{ width: "14rem" }}
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
      <Footer />
    </div>
  );
}

export default ListOffers;
