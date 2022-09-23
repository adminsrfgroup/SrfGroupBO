import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { entitiesFaq, fetchFaq } from "@store/faq/slice";

export default function Faq() {
  const dispatch = useDispatch();
  const router = useRouter();

  const entitiesFaqSelector = useSelector(entitiesFaq) ?? [];

  const redirectToAddUpdate = () => {
    router.push("/faq/add-update");
  };

  React.useEffect(() => {
    dispatch(
      fetchFaq({
        page: 0,
        size: 20,
        queryParams: ""
      })
    );
  }, []);

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div className="flex">
          <div className="flex-1">List of FAQ</div>
          <div className="">
            <button
              className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
              onClick={redirectToAddUpdate}>
              Add new FAQ
            </button>
          </div>
        </div>

        <table className="border-collapse border border-slate-400 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th className="border border-slate-300">ID</th>
              <th className="border border-slate-300">Question</th>
              <th className="border border-slate-300">Response</th>
              <th className="border border-slate-300">Actions</th>
            </tr>
          </thead>
          {entitiesFaqSelector.map((faq: any, i: number) => (
            <tbody className="bg-white" key={`entity-${i}`}>
              <tr>
                <td className="border border-slate-100">Ar</td>
                <td className="border border-slate-100">{faq.id}</td>
                <td className="border border-slate-100">{faq.questionAr}</td>
                <td className="border border-slate-100">{faq.responseAr}</td>
                <td className="border border-slate-100" rowSpan={3}>
                  <button className="px-6 py-2 rounded bg-green-600 hover:bg-green-700 text-white mx-2">
                    Edit
                  </button>
                  <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td className="border border-slate-100">Fr</td>
                <td className="border border-slate-100">{faq.id}</td>
                <td className="border border-slate-100">{faq.questionFr}</td>
                <td className="border border-slate-100">{faq.responseFr}</td>
              </tr>
              <tr>
                <td className="border border-slate-300">En</td>
                <td className="border border-slate-300">{faq.id}</td>
                <td className="border border-slate-100">{faq.questionEn}</td>
                <td className="border border-slate-100">{faq.responseEn}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </main>
      <Footer />
    </div>
  );
}
