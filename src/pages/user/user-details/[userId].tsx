import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { hasAnyAuthority } from "../../../lib/utils-functions";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { FilterMatchMode } from "primereact/api";
import {
  addRemoveAdmin,
  addRemoveAdminUser,
  blockedUnblockedUser,
  blockedUnblockeUser,
  entitiesOnesignal,
  entitiesUsers,
  entityProfile,
  fetchOneSignalsByUser,
  fetchProfileUser,
  loadingProfile
} from "@store/user/slice";
import { AUTHORITIES } from "../../../constants/authorities";
import { TabPanel, TabView } from "primereact/tabview";
import { useRouter } from "next/router";
import { Image } from "primereact/image";

export default function UserDetails() {
  const router = useRouter();
  const { userId } = router.query;

  const dispatch = useDispatch();

  const entitiesUsersSelector = useSelector(entitiesUsers) ?? [];
  const entitiesOnesignalSelector = useSelector(entitiesOnesignal) ?? [];
  // const totalItemsUsersSelector = useSelector(totalItemsUsers) ?? -1;
  // const totalPagesUsersSelector = useSelector(totalPagesUsers) ?? 0;

  const loadingProfileSelector = useSelector(loadingProfile) ?? false;
  const entityProfileSelector = useSelector(entityProfile) ?? {};

  // const loadingBlockedUnblockedUserSelector = useSelector(loadingBlockedUnblockedUser) ?? false;
  const blockedUnblockedUserSelector =
    useSelector(blockedUnblockedUser) ?? false;
  const addRemoveAdminUserSelector = useSelector(addRemoveAdminUser) ?? false;

  const [openBlockedModal, setOpenBlockedModal] = React.useState(false);
  const [openRemoveAddModal, setOpenRemoveAddModal] = React.useState(false);
  const [userBlocked, setUserBlocked] = React.useState<any>({});
  const [titleAddRemoveAdmin, setTitleAddRemoveAdmin] = React.useState<string>(
    ""
  );
  const [
    descriptionAddRemoveAdmin,
    setDescriptionAddRemoveAdmin
  ] = React.useState<string>("");
  const [customers, setCustomers] = React.useState<any[]>([]);
  const [filters, setFilters] = React.useState({
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
    phone: { value: null, matchMode: FilterMatchMode.CONTAINS },
    registerDate: { value: null, matchMode: FilterMatchMode.CONTAINS },
    address: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sourceRegister: { value: null, matchMode: FilterMatchMode.CONTAINS },
    activatedAccount: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });
  const [loading, setLoading] = React.useState(true);
  const [globalFilterValue2, setGlobalFilterValue2] = React.useState("");

  React.useEffect(() => {
    if (userId || blockedUnblockedUserSelector || addRemoveAdminUserSelector) {
      dispatch(
        fetchProfileUser({
          userId: userId
        })
      );
    }
  }, [userId, blockedUnblockedUserSelector, addRemoveAdminUserSelector]);

  React.useEffect(() => {
    console.log("entityProfileSelector ", entityProfileSelector);

    if (entityProfileSelector?.id) {
      dispatch(fetchOneSignalsByUser({ id: entityProfileSelector?.id }));
    }
  }, [entityProfileSelector]);

  React.useEffect(() => {
    if (entitiesUsersSelector?.length) {
      setCustomers(entitiesUsersSelector.slice());
      setLoading(false);
    }
  }, [entitiesUsersSelector]);

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

  const onOpenBlockedModal = (user: any) => {
    console.log("onOpenBlockedModal ", user);
    setOpenBlockedModal(true);
    setUserBlocked(user);
  };
  const onHideBlockedModal = () => {
    setOpenBlockedModal(false);
  };

  const onOpenAddRemovedModal = () => {
    setOpenRemoveAddModal(true);
    setTitleAddRemoveAdmin(
      hasAnyAuthority(entityProfileSelector.authorities || [], [
        AUTHORITIES.ADMIN
      ])
        ? "Remove Admin"
        : "Add Admin"
    );
    setDescriptionAddRemoveAdmin(
      hasAnyAuthority(entityProfileSelector.authorities || [], [
        AUTHORITIES.ADMIN
      ])
        ? "Are you sur to remove this user admin ?"
        : "Are you sur to add this user admin ?"
    );
  };
  const onHideAddRemoveModal = () => {
    setOpenRemoveAddModal(false);
  };

  const confirmBlockedUser = () => {
    setOpenBlockedModal(false);
    dispatch(
      blockedUnblockeUser({
        userId: userBlocked.id,
        blockUnblock: !userBlocked?.blocked
      })
    );
  };

  const confirmAddRemoveAdmindUser = () => {
    setOpenRemoveAddModal(false);
    dispatch(
      addRemoveAdmin({
        userId: entityProfileSelector.id,
        addRemove: !hasAnyAuthority(entityProfileSelector.authorities || [], [
          AUTHORITIES.ADMIN
        ])
      })
    );
    // props.addRemoveAdmin(userAddRemoveAdmin.id, (!hasAnyAuthority(userAddRemoveAdmin.authorities || [], [AUTHORITIES.ADMIN])).toString());
  };

  const representativeBodyAcitvityTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        {!hasAnyAuthority(rowData.authorities || [], [
          AUTHORITIES.SUPER_ADMIN
        ]) ? (
          <Button
            label={rowData.blockedByAdmin ? "UnBlock" : "Block"}
            className={rowData.blocked ? "p-button-info" : "p-button-warning"}
            onClick={() => onOpenBlockedModal(rowData)}
          />
        ) : null}

        {!hasAnyAuthority(rowData.authorities || [], [
          AUTHORITIES.SUPER_ADMIN
        ]) ? (
          <Button
            label={
              hasAnyAuthority(rowData.authorities || [], [AUTHORITIES.ADMIN])
                ? "Remove Admin"
                : "Add Admin"
            }
            className="p-button-success"
            onClick={() => onOpenAddRemovedModal()}
          />
        ) : null}
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

  const statusItemTemplate = (option: any) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2 bg-black-alpha-10">
        <TabView>
          <TabPanel header="User informations">
            {loadingProfileSelector ? (
              "loading"
            ) : (
              <div className="card">
                <div className="card-container overflow-hidden">
                  <div className="flex">
                    <div className="flex-initial flex justify-content-center font-bold text-white m-2 px-5 py-3 border-round">
                      <Image
                        src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                        alt="Image"
                        width="250"
                      />
                    </div>
                    <div className="flex flex-column font-bold m-2 px-5 py-3 border-round">
                      <div className="flex flex-row-reverse">
                        {!hasAnyAuthority(
                          entityProfileSelector?.authorities || [],
                          [AUTHORITIES.SUPER_ADMIN]
                        ) ? (
                          <Button
                            label={
                              entityProfileSelector.blocked
                                ? "UnBlock"
                                : "Block"
                            }
                            className={
                              entityProfileSelector.blocked
                                ? "p-button-info"
                                : "p-button-warning"
                            }
                            onClick={() =>
                              onOpenBlockedModal(entityProfileSelector)
                            }
                          />
                        ) : null}

                        {!hasAnyAuthority(
                          entityProfileSelector?.authorities || [],
                          [AUTHORITIES.SUPER_ADMIN]
                        ) ? (
                          <Button
                            label={
                              hasAnyAuthority(
                                entityProfileSelector?.authorities || [],
                                [AUTHORITIES.ADMIN]
                              )
                                ? "Remove Admin"
                                : "Add Admin"
                            }
                            className="p-button-success mr-1"
                            onClick={() => onOpenAddRemovedModal()}
                          />
                        ) : null}
                      </div>
                      <div className="flex">
                        <div className="card">
                          <h5>Vertical and Grid</h5>
                          <div className="formgrid grid">
                            <div className="field col">
                              <label htmlFor="firstname2">Id</label>
                              <input
                                id="id"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.id}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">Firstname</label>
                              <input
                                id="firstName"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.firstName || ""}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">Lastname</label>
                              <input
                                id="lastName"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.lastName || ""}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">Email</label>
                              <input
                                id="email"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.email}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                          </div>

                          <div className="formgrid grid">
                            <div className="field col">
                              <label htmlFor="firstname2">Phone</label>
                              <input
                                id="phone"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.phone || ""}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">Register Date</label>
                              <input
                                id="registerDate"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.registerDate || ""}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">authorities</label>
                              <input
                                id="authorities"
                                type="text"
                                readOnly={true}
                                value={
                                  (entityProfileSelector?.authorities &&
                                    entityProfileSelector?.authorities[0]
                                      ?.name) ||
                                  ""
                                }
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">
                                SourceConnectedDevice
                              </label>
                              <input
                                id="sourceConnectedDevice"
                                type="text"
                                readOnly={true}
                                value={
                                  entityProfileSelector.sourceConnectedDevice
                                }
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                          </div>

                          <div className="formgrid grid">
                            <div className="field col">
                              <label htmlFor="firstname2">
                                activatedAccount
                              </label>
                              <input
                                id="activatedAccount"
                                type="text"
                                readOnly={true}
                                value={entityProfileSelector.activatedAccount}
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">address</label>
                              <input
                                id="address"
                                type="text"
                                readOnly={true}
                                value={
                                  entityProfileSelector?.address?.city ||
                                  "" +
                                    ", " +
                                    entityProfileSelector?.address?.country ||
                                  ""
                                }
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                            <div className="field col">
                              <label htmlFor="lastname2">
                                linkProfileFacebook
                              </label>
                              <input
                                id="linkProfileFacebook"
                                type="text"
                                readOnly={true}
                                value={
                                  entityProfileSelector.linkProfileFacebook ||
                                  ""
                                }
                                className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mt-5">
                        <h5>List OneSignal</h5>
                        <DataTable
                          value={entitiesOnesignalSelector}
                          responsiveLayout="scroll">
                          <Column field="id" header="id"></Column>
                          <Column
                            field="idOneSignal"
                            header="idOneSignal"></Column>
                          <Column
                            field="registerDate"
                            header="registerDate"></Column>
                          <Column
                            field="sourceConnectedDevice"
                            header="sourceConnectedDevice"></Column>
                        </DataTable>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel header="User devices">
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
                  "phone",
                  "email",
                  "status",
                  "email"
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
                  filterPlaceholder="Search by sourceRegister"
                />
                <Column
                  header="SourceRegister"
                  filterField="sourceRegister"
                  field="sourceRegister"
                  filter
                  filterElement={statusRowFilterTemplateSourceRegister}
                  filterPlaceholder="Search by sourceRegister"
                  showFilterMenu={false}
                  filterMenuStyle={{ width: "14rem" }}
                  style={{ minWidth: "12rem" }}
                />
                <Column
                  header="Activated Register"
                  filterField="activatedAccount"
                  field="activatedAccount"
                  filter
                  filterElement={statusRowFilterTemplateSourceRegister}
                  filterPlaceholder="Search by activated"
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
          </TabPanel>
        </TabView>

        <Dialog
          header="Blocked user"
          visible={openBlockedModal}
          footer={renderFooterBlockedModal()}
          onHide={() => onHideBlockedModal()}>
          <p>Are you sur to block this user ?</p>
        </Dialog>

        <Dialog
          header={titleAddRemoveAdmin}
          visible={openRemoveAddModal}
          footer={renderFooterAddRemoveAdminModal()}
          onHide={() => onHideAddRemoveModal()}>
          <p>{descriptionAddRemoveAdmin}</p>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
