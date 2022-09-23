import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  entitiesDescriptionNewOffer,
  fetchDescriptionNewOffer
} from "@store/offer/slice";

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

  const getContent = (content?: string | null | undefined): string => {
    return content || "";
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div>
          <div className="flex">
            <div className="flex-1">List of categories</div>
            <div className="">
              <button
                className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                onClick={() => redirectTo()}>
                Add new Description Offer
              </button>
            </div>
          </div>

          <table className="border-collapse border border-slate-400 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th>#</th>
                <th className="border border-slate-300">ID</th>
                <th className="border border-slate-300">descriptionAr</th>
                <th className="border border-slate-300">descriptionFr</th>
                <th className="border border-slate-300">descriptionEn</th>
              </tr>
            </thead>

            {entitiesDescriptionNewOfferSelector.map(
              (description: any, i: number) => (
                <tbody className="bg-white" key={`entity-${i}`}>
                  <tr>
                    <td className="border border-slate-100">Ar</td>
                    <td className="border border-slate-100">
                      {description.id}
                    </td>
                    <td className="border border-slate-100">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getContent(description?.descriptionAr)
                        }}></div>
                    </td>
                    <td className="border border-slate-100">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getContent(description?.descriptionFr)
                        }}></div>
                    </td>
                    <td className="border border-slate-100">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: getContent(description?.descriptionEn)
                        }}></div>
                    </td>
                    <td className="border border-slate-100">
                      <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2">
                        Edit
                      </button>
                      <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              )
            )}
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
