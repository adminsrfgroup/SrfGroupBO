import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import { Button } from "primereact/button";
import Footer from "@components/Footer";
import { Card } from "primereact/card";
import { useRouter } from "next/router";
import { useOffer } from "../../../lib/offer/hooks/useOffer";
import { ProgressSpinner } from "primereact/progressspinner";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { useFormik } from "formik";
import {
  initialValuesPubOffer,
  validationSchemaPubOffer
} from "../../../lib/offer/validation/initial-values-add-update-descriptionadd-offer";
import { convertDateTimeToServer } from "../../../lib/utils-functions";

const modules = [{ name: "Search Page", code: "SEARCH" }];

const initialValues = initialValuesPubOffer;

export default function UserDetails() {
  const router = useRouter();
  const { offerId } = router.query;

  const {
    loadingPublicOfferSelector,
    entityPublicOfferSelector,
    fetchOfferDetails,
    addOfferPub,
    addSuccessOfferSelector
  } = useOffer();
  const [openPubOfferModal, setOpenPubOfferModal] = React.useState(false);

  const [startDate, setStartDate] = React.useState<Date | Date[] | undefined>(
    undefined
  );
  const [endDate, setEndDate] = React.useState<Date | Date[] | undefined>(
    undefined
  );
  const [selectedModule, setSelectedModule] = React.useState<
    Date | Date[] | undefined
  >(undefined);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaPubOffer,
    onSubmit: (values) => {
      console.log("values ", values);
      addOfferPub({
        startDate: convertDateTimeToServer(values.startDate),
        endDate: convertDateTimeToServer(values.endDate),
        module: values.module,
        available: true,
        offer: {
          id: Number(offerId)
        }
      });
    }
  });

  React.useEffect(() => {
    console.log("addSuccessOfferSelector ", addSuccessOfferSelector);
    if (addSuccessOfferSelector) {
      setOpenPubOfferModal(false);
    }
  }, [addSuccessOfferSelector]);

  React.useEffect(() => {
    if (offerId) {
      fetchOfferDetails({ id: offerId as string });
    }
  }, [offerId]);

  const header = (
    <img
      alt="Card"
      src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
      style={{ width: "25em" }}
    />
  );
  const footer = (
    <span>
      <Button label="Save" icon="pi pi-check" />
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-secondary ml-2"
      />
      <Button
        label="Add to Search Pub"
        icon="pi pi-plus"
        className="p-button-success ml-2"
        onClick={() => setOpenPubOfferModal(true)}
      />
    </span>
  );

  const onHidePubOfferModal = () => {
    setOpenPubOfferModal(false);
  };

  const onModuleChange = (e: { value: any }) => {
    setSelectedModule(e.value);
    formik.setFieldValue("module", e.value.code);
  };

  const isFormFieldValid = (name: "startDate" | "endDate" | "module") =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name: "startDate" | "endDate" | "module") => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  const onChangeStartDate = (e: any) => {
    setStartDate(e.value);
    formik.setFieldValue("startDate", e.value);
  };

  const onChangeEndDate = (e: any) => {
    setEndDate(e.value);
    formik.setFieldValue("endDate", e.value);
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2 bg-black-alpha-10">
        {loadingPublicOfferSelector ? (
          <div className="text-center">
            <ProgressSpinner />
          </div>
        ) : (
          <Card
            title={entityPublicOfferSelector?.offer?.title}
            subTitle={entityPublicOfferSelector?.offer?.typeOffer}
            footer={footer}
            header={header}>
            <p
              className="m-0"
              style={{ lineHeight: "1.5" }}
              dangerouslySetInnerHTML={{
                __html: entityPublicOfferSelector?.offer?.description || ""
              }}></p>
          </Card>
        )}

        <Dialog
          header="Add Pub offer"
          visible={openPubOfferModal}
          // footer={renderFooterPubOfferModal()}
          onHide={() => onHidePubOfferModal()}>
          <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-6">
                <label htmlFor="basic">Basic</label>
                <Calendar
                  id="startDate"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => onChangeStartDate(e)}
                />
                {getFormErrorMessage("startDate")}
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="basic">Basic</label>
                <Calendar
                  id="endDate"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => onChangeEndDate(e)}
                />
                {getFormErrorMessage("endDate")}
              </div>
            </div>
            <div className="p-fluid grid formgrid">
              <div className="field col-12 md:col-12">
                <Dropdown
                  value={selectedModule}
                  options={modules}
                  onChange={onModuleChange}
                  optionLabel="name"
                  placeholder="Select a Module"
                />
                {getFormErrorMessage("module")}
              </div>
            </div>
            <div>
              <Button
                label="Cancel"
                icon="pi pi-times"
                onClick={() => onHidePubOfferModal()}
                className="p-button-text"
              />
              <Button
                type="submit"
                label="Add to Pub"
                icon="pi pi-check"
                autoFocus
              />
            </div>
          </form>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
