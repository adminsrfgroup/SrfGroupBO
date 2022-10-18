import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  entitiesDescriptionNewOffer,
  fetchDescriptionNewOffer
} from "@store/offer/slice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function DescriptionNewOffer() {
  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesDescriptionNewOfferSelector =
    useSelector(entitiesDescriptionNewOffer) ?? [];

  const redirectTo = () => {
    router.push("/offer/add-update-description-new-offer");
  };

  React.useEffect(() => {
    dispatch(fetchDescriptionNewOffer({}));
  }, []);

  const edit = (topHomeSlidesImages: any) => {
    router.push("/offer/description-add-offer/" + topHomeSlidesImages.id);
  };

  const representativeBodyActionTemplate = (rowData: any) => {
    return (
      <React.Fragment>
        <Button
          label={"Edit"}
          className={"p-button-info"}
          onClick={() => edit(rowData)}
        />
        <Button label={"Delete"} className={"p-button-danger"} />
      </React.Fragment>
    );
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

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-2">
        <div>
          <div className="flex">
            <div className="flex-1">List of categories</div>
            <div className="">
              <Button
                label="Add new Description Offer"
                aria-label="Submit"
                onClick={() => redirectTo()}
                disabled={
                  entitiesDescriptionNewOfferSelector.length ? true : false
                }
              />
            </div>
          </div>

          <div className="card mt-5">
            <DataTable
              value={entitiesDescriptionNewOfferSelector}
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
                field="sourceConnectedDevice"
                header="Actions"
                body={representativeBodyActionTemplate}></Column>
            </DataTable>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
