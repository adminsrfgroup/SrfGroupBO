import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { entitiesNewsLetter, fetchNewsLetter } from "@store/news-letter/slice";

export default function NewsLetter() {
  const dispatch = useDispatch();

  const entitiesNewsLetterSelector = useSelector(entitiesNewsLetter) ?? [];

  React.useEffect(() => {
    dispatch(
      fetchNewsLetter({
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
        <table className="border-collapse border border-slate-400 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-slate-300">ID</th>
              <th className="border border-slate-300">Email</th>
              <th className="border border-slate-300">Action</th>
            </tr>
          </thead>

          {entitiesNewsLetterSelector.map((newsLetter: any, i: number) => (
            <tbody className="bg-white" key={`entity-${i}`}>
              <tr>
                <td className="border border-slate-100">{newsLetter.id}</td>
                <td className="border border-slate-100">{newsLetter.email}</td>
                <td className="border border-slate-100">
                  <button className="px-6 py-2 rounded bg-rose-400 hover:bg-rose-500 text-rose-100">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </main>
      <Footer />
    </div>
  );
}
