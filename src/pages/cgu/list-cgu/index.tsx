import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { useCgu } from "../../../lib/cgu/hooks/useCgu";

export default function AddCgu() {
  const router = useRouter();
  const { entityCguSelector, fetchListCgu } = useCgu();

  React.useEffect(() => {
    fetchListCgu();
  }, []);

  const redirect = (type: boolean) => {
    if (type) {
      router.push("/cgu/update-cgu/" + entityCguSelector?.id);
    } else {
      router.push("/cgu/add-cgu");
    }
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="flex mb-3">
          <div className="flex-1">
            <h5 className="m-0">List of CGU</h5>
          </div>
          <div className="">
            <Button
              label="Update CGU"
              className="p-button-link"
              onClick={() => redirect(true)}
            />

            <Button
              label="Add CGU"
              className="p-button-link"
              onClick={() => redirect}
            />
          </div>
        </div>

        <table className="border-collapse border border-slate-400 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-slate-300">ID</th>
              <th className="border border-slate-300">contentAr</th>
              <th className="border border-slate-300">contentFr</th>
              <th className="border border-slate-300">contentEn</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            <tr>
              <td className="border border-slate-100">
                {entityCguSelector.id}
              </td>
              <td className="border border-slate-100">
                <div
                  dangerouslySetInnerHTML={{
                    __html: entityCguSelector.contentAr || ""
                  }}></div>
              </td>
              <td className="border border-slate-100">
                <div
                  dangerouslySetInnerHTML={{
                    __html: entityCguSelector.contentFr || ""
                  }}></div>
              </td>
              <td className="border border-slate-100">
                <div
                  dangerouslySetInnerHTML={{
                    __html: entityCguSelector.contentEn || ""
                  }}></div>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <Footer />
    </div>
  );
}
