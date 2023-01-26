import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import { entitiesUsers, fetchUsers } from "@store/user/slice";
import { useRouter } from "next/router";

function ListUsers() {
  const dispatch = useDispatch();
  const router = useRouter();

  // const loadingEntitiesUsersSelector = useSelector(loadingEntitiesUsers) ?? false;
  const entitiesUsersSelector = useSelector(entitiesUsers) ?? [];
  // const totalItemsUsersSelector = useSelector(totalItemsUsers) ?? -1;
  // const totalPagesUsersSelector = useSelector(totalPagesUsers) ?? 0;

  const [openBlockedModal, setOpenBlockedModal] = React.useState(false);
  const [openRemoveAddModal, setOpenRemoveAddModal] = React.useState(false);
  // const [userBlocked, setUserBlocked] = React.useState<any>({})
  // const [userAddRemoveAdmin, setUserAddRemoveAdmin] = React.useState<any>({})
  // const [titleAddRemoveAdmin, setTitleAddRemoveAdmin] = React.useState<string>(
  //   ''
  // )
  const [descriptionAddRemoveAdmin] = React.useState<string>("");
  const [customers, setCustomers] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    registerDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sourceConnectedDevice: { value: null, matchMode: FilterMatchMode.CONTAINS },
    activatedAccount: { value: "", matchMode: FilterMatchMode.CONTAINS }
  });
  const [loading, setLoading] = React.useState(true);
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    console.log("value ", value);
    const _filters = { ...filters };
    _filters["email"].value = value;

    setFilters(_filters);
    setGlobalFilterValue2(value);
  };

  const statuses = [
    "WebBrowser",
    "qualified",
    "new",
    "negotiation",
    "renewal",
    "proposal"
  ];

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

  const renderFooterBlockedModal = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHideBlockedModal()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => confirmBlockedUser()}
          autoFocus
        />
      </div>
    );
  };

  const renderFooterAddRemoveAdminModal = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHideAddRemoveModal()}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => confirmAddRemoveAdmindUser()}
          autoFocus
        />
      </div>
    );
  };

  // const onOpenBlockedModal = (user: any) => {
  //   setOpenBlockedModal(true)
  //   setUserBlocked(user)
  // }
  const onHideBlockedModal = () => {
    setOpenBlockedModal(false);
  };
  //
  // const onOpenAddRemovedModal = (user: any) => {
  //   setOpenRemoveAddModal(true)
  //   setUserAddRemoveAdmin(user)
  //   setTitleAddRemoveAdmin(
  //     hasAnyAuthority(user.authorities || [], [AUTHORITIES.ADMIN])
  //       ? 'Remove Admin'
  //       : 'Add Admin'
  //   )
  //   setDescriptionAddRemoveAdmin(
  //     hasAnyAuthority(user.authorities || [], [AUTHORITIES.ADMIN])
  //       ? 'Are you sur to remove this user admin ?'
  //       : 'Are you sur to add this user admin ?'
  //   )
  // }
  const onHideAddRemoveModal = () => {
    setOpenRemoveAddModal(false);
  };

  const confirmBlockedUser = () => {
    setOpenBlockedModal(false);
  };

  const confirmAddRemoveAdmindUser = () => {
    // console.log(
    //   'userAddRemoveAdmin ',
    //   !hasAnyAuthority(userAddRemoveAdmin.authorities || [], [
    //     AUTHORITIES.ADMIN,
    //   ])
    // )
    setOpenRemoveAddModal(false);
  };

  const rediretTo = (path: any) => {
    console.log("path ", path);
    router.push(path);
  };

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"View"}
          className={"p-button-info"}
          onClick={() => rediretTo("/user/user-details/" + rowData.id)}
        />
      </React.Fragment>
    );
  };

  const representativeBodyTemplateName = (rowData: any) => {
    return (
      <React.Fragment>
        <img
          alt={rowData.imageUrl}
          src={rowData.imageUrl}
          onError={(e: any) =>
            (e.target.src =
              "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
          }
          width={32}
          style={{ verticalAlign: "middle" }}
        />
        <span className="image-text">
          {rowData.firstName} {rowData.lastName}
        </span>
      </React.Fragment>
    );
  };

  const statusRowFilterTemplateSourceRegister = (options: any) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e: any) => options.filterApplyCallback(e.value)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusRowFilterTemplateActivatedAccount = (rowData: any) => {
    return rowData?.activatedAccount?.toString();
  };

  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  React.useEffect(() => {
    if (entitiesUsersSelector?.length == 0) {
      setLoading(true);
      dispatch(
        fetchUsers({
          page: 0,
          size: 20,
          queryParams: ""
        })
      );
    }
  }, []);

  React.useEffect(() => {
    setCustomers(entitiesUsersSelector.slice());
    setLoading(false);
  }, [entitiesUsersSelector]);

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div className="card">
          <DataTable
            value={customers}
            paginator
            className="p-datatable-customers"
            rows={10}
            dataKey="id"
            filters={filters}
            filterDisplay="row"
            loading={loading}
            responsiveLayout="scroll"
            globalFilterFields={[
              "name",
              "email",
              "phone",
              "registerDate",
              "address",
              "sourceConnectedDevice",
              "activatedAccount"
            ]}
            header={header}
            emptyMessage="No customers found.">
            <Column
              header="Name"
              filterField="name"
              field="name"
              filter
              filterPlaceholder="Search by FirstName/LastName"
              body={representativeBodyTemplateName}
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Email"
              filterField="email"
              field="email"
              filter
              filterPlaceholder="Search by email"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Phone"
              filterField="phone"
              field="phone"
              filter
              filterPlaceholder="Search by phone"
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="RegisterDate"
              filterField="registerDate"
              style={{ minWidth: "12rem" }}
              field="registerDate"
              filter
              filterPlaceholder="Search by registerDate"
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
              header="SourceConnectedDevice"
              filterField="sourceConnectedDevice"
              field="sourceConnectedDevice"
              filter
              filterElement={statusRowFilterTemplateSourceRegister}
              filterPlaceholder="Search by sourceConnectedDevice"
              showFilterMenu={false}
              filterMenuStyle={{ width: "14rem" }}
              style={{ minWidth: "12rem" }}
            />
            <Column
              header="Activated Register"
              filterField="activatedAccount"
              field="activatedAccount"
              filter
              body={statusRowFilterTemplateActivatedAccount}
              filterPlaceholder="Search by activatedAccount"
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

          <Dialog
            header="Blocked user"
            visible={openBlockedModal}
            footer={renderFooterBlockedModal()}
            onHide={() => onHideBlockedModal()}>
            <p>Are you sur to block this user ?</p>
          </Dialog>

          <Dialog
            header={"titleAddRemoveAdmin"}
            visible={openRemoveAddModal}
            footer={renderFooterAddRemoveAdminModal()}
            onHide={() => onHideAddRemoveModal()}>
            <p>{descriptionAddRemoveAdmin}</p>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ListUsers;
