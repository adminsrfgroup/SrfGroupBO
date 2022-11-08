import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { entitiesFeatureHome, fetchFeatureHome } from "@store/home/slice";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function FeatureHome() {
  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesFeatureHomeSelector = useSelector(entitiesFeatureHome) ?? [];

  React.useEffect(() => {
    dispatch(fetchFeatureHome({}));
  }, []);

  const redirectToAddUpdate = () => {
    router.push("/home/feature-home/add-feature-home");
  };

  const edit = (postHomeFeature: any) => {
    router.push("/home/feature-home/" + postHomeFeature.id);
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
          <div className="flex-1">List of ostHomeFeature</div>
          <div className="">
            <Button
              label="Add new PostHomeFeature"
              aria-label="Submit"
              onClick={redirectToAddUpdate}
              disabled={entitiesFeatureHomeSelector.length ? true : false}
            />
          </div>
        </div>

        <div className="card mt-5">
          <DataTable
            value={entitiesFeatureHomeSelector}
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

        {/*<table className="border-collapse border border-slate-400 w-full">*/}
        {/*  <thead className="bg-gray-200">*/}
        {/*    <tr>*/}
        {/*      <th className="border border-slate-300">ID</th>*/}
        {/*      <th className="border border-slate-300">descriptionAr</th>*/}
        {/*      <th className="border border-slate-300">descriptionFr</th>*/}
        {/*      <th className="border border-slate-300">descriptionEn</th>*/}
        {/*      <th className="border border-slate-300">Image</th>*/}
        {/*      <th className="border border-slate-300">Actions</th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}

        {/*  {entitiesFeatureHomeSelector.map((topHomeSlides: any, i: number) => (*/}
        {/*    <tbody className="bg-white" key={`entity-${i}`}>*/}
        {/*      <tr>*/}
        {/*        <td className="border border-slate-100">{topHomeSlides.id}</td>*/}
        {/*        <td className="border border-slate-100">*/}
        {/*          <div*/}
        {/*            dangerouslySetInnerHTML={{*/}
        {/*              __html: topHomeSlides.descriptionAr || ""*/}
        {/*            }}></div>*/}
        {/*        </td>*/}
        {/*        <td className="border border-slate-100">*/}
        {/*          <div*/}
        {/*            dangerouslySetInnerHTML={{*/}
        {/*              __html: topHomeSlides.descriptionFr || ""*/}
        {/*            }}></div>*/}
        {/*        </td>*/}
        {/*        <td className="border border-slate-100">*/}
        {/*          <div*/}
        {/*            dangerouslySetInnerHTML={{*/}
        {/*              __html: topHomeSlides.descriptionEn || ""*/}
        {/*            }}></div>*/}
        {/*        </td>*/}
        {/*        <td className="border border-slate-100">*/}
        {/*          {topHomeSlides.image ? (*/}
        {/*            <img src={topHomeSlides.image} width={250} height={250} />*/}
        {/*          ) : null}*/}
        {/*        </td>*/}
        {/*        <td className="border border-slate-100">*/}
        {/*          <button*/}
        {/*            className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2"*/}
        {/*            onClick={() => edit(topHomeSlides)}>*/}
        {/*            Edit*/}
        {/*          </button>*/}
        {/*          <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">*/}
        {/*            Delete*/}
        {/*          </button>*/}
        {/*        </td>*/}
        {/*      </tr>*/}
        {/*    </tbody>*/}
        {/*  ))}*/}
        {/*</table>*/}
      </main>
      <Footer />
    </div>
  );
}
