import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { entitiesTopSlides, fetchTopSlides } from "@store/home/slice";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function TopSlidesImages() {
  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesTopSlidesSelector = useSelector(entitiesTopSlides) ?? [];

  React.useEffect(() => {
    dispatch(fetchTopSlides({}));
  }, []);

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
        <Button label={"Delete"} className={"p-button-danger"} />
      </React.Fragment>
    );
  };

  const representativeBodyImageTemplate = (rowData: any) => {
    return (
      <div>
        {rowData.image ? (
          <img src={rowData.image} width={250} height={250} />
        ) : null}
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
              header="Image"
              body={(item: any) =>
                representativeBodyImageTemplate(item)
              }></Column>
            <Column
              field="sourceConnectedDevice"
              header="Actions"
              body={representativeBodyActionTemplate}></Column>
          </DataTable>
        </div>
      </main>
      <Footer />
    </div>
  );
}
