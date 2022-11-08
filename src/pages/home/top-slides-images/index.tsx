import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  deleteSuccessTopSlides,
  deleteTopSlides,
  entitiesTopSlides,
  fetchTopSlides
} from "@store/home/slice";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";

export default function TopSlidesImages() {
  const [openBlockedModal, setOpenBlockedModal] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState<any>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesTopSlidesSelector = useSelector(entitiesTopSlides) ?? [];
  const deleteSuccessTopSlidesSelector =
    useSelector(deleteSuccessTopSlides) ?? false;

  React.useEffect(() => {
    dispatch(fetchTopSlides({}));
  }, []);

  React.useEffect(() => {
    if (deleteSuccessTopSlidesSelector) {
      dispatch(fetchTopSlides({}));
    }
  }, [deleteSuccessTopSlidesSelector]);

  const redirectToAddUpdate = () => {
    router.push("/home/top-slides-images/add-top-slides-images");
  };

  const edit = (topHomeSlidesImages: any) => {
    router.push("/home/top-slides-images/" + topHomeSlidesImages.id);
  };

  const representativeBodyDescriptionTemplate = (
    rowData: any,
    keyLang: string
  ) => {
    if (keyLang === "ar") {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: rowData.descriptionAr || ""
          }}></div>
      );
    } else if (keyLang === "fr") {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: rowData.descriptionFr || ""
          }}></div>
      );
    }
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: rowData.descriptionEn || ""
        }}></div>
    );
  };

  const representativeBodyActionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"Edit"}
          className={"p-button-info"}
          onClick={() => edit(rowData)}
        />
        <Button
          label={"Delete"}
          className={"p-button-danger"}
          onClick={() => onOpenBlockedModal(rowData)}
        />
      </React.Fragment>
    );
  };

  const representativeBodyImageDesktopTemplate = (rowData: any) => {
    return (
      <div>
        {rowData.imageDesktop ? (
          <img src={rowData.imageDesktop} width={250} height={250} />
        ) : null}
      </div>
    );
  };

  const representativeBodyImageMobileTemplate = (rowData: any) => {
    return (
      <div>
        {rowData.imageMobile ? (
          <img src={rowData.imageMobile} width={250} height={250} />
        ) : null}
      </div>
    );
  };

  const onOpenBlockedModal = (item: any) => {
    console.log("onOpenBlockedModal ", item);
    setDeleteItem(item);
    setOpenBlockedModal(true);
  };
  const onHideBlockedModal = () => {
    setOpenBlockedModal(false);
  };
  const confirmBlockedUser = () => {
    setOpenBlockedModal(false);
    dispatch(deleteTopSlides({ id: deleteItem?.id }));
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

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2">
        <div className="flex">
          <div className="flex-1">List of TopHomeSlidesImage</div>
          <div className="">
            <Button
              label="Add new TopHomeSlidesImage"
              aria-label="Submit"
              onClick={redirectToAddUpdate}
            />
          </div>
        </div>

        <div className="card mt-5">
          <DataTable
            value={entitiesTopSlidesSelector}
            responsiveLayout="scroll">
            <Column field="id" header="ID"></Column>
            <Column
              field="descriptionAr"
              header="descriptionAr"
              body={(item: any) =>
                representativeBodyDescriptionTemplate(item, "ar")
              }></Column>
            <Column
              field="descriptionFr"
              header="descriptionFr"
              body={(item: any) =>
                representativeBodyDescriptionTemplate(item, "fr")
              }></Column>
            <Column
              field="descriptionEn"
              header="descriptionEn"
              body={(item: any) =>
                representativeBodyDescriptionTemplate(item, "en")
              }></Column>
            <Column
              header="Image Desktop"
              body={(item: any) =>
                representativeBodyImageDesktopTemplate(item)
              }></Column>
            <Column
              header="Image Mobile"
              body={(item: any) =>
                representativeBodyImageMobileTemplate(item)
              }></Column>
            <Column
              field="sourceConnectedDevice"
              header="Actions"
              body={representativeBodyActionTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          header="Delete item"
          visible={openBlockedModal}
          footer={renderFooterBlockedModal()}
          onHide={() => onHideBlockedModal()}>
          <p>Are you sur to delete this item ?</p>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
}
