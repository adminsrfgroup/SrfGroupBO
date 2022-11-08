import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { entitiesContactUs, fetchContactUs } from "@store/contact-us/slice";

function ContactUs() {
  const dispatch = useDispatch();

  const entitiesContactUsSelector = useSelector(entitiesContactUs) ?? [];

  React.useEffect(() => {
    console.log("fetchContactUs");
    dispatch(
      fetchContactUs({
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
          <div className="flex-1">List of contact us</div>
          <div className="">
            <button className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100">
              Add new ContactUs
            </button>
          </div>
        </div>

        <table className="border-collapse border border-slate-400 w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th className="border border-slate-300">ID</th>
              <th className="border border-slate-300">name</th>
              <th className="border border-slate-300">email</th>
              <th className="border border-slate-300">subject</th>
              <th className="border border-slate-300">message</th>
              <th className="border border-slate-300">Actions</th>
            </tr>
          </thead>

          {entitiesContactUsSelector.map((contactUs: any, index: number) => (
            <tbody className="bg-white" key={`entity-${index}`}>
              <tr>
                <td className="border border-slate-100">Ar</td>
                <td className="border border-slate-100">{contactUs.id}</td>
                <td className="border border-slate-100">{contactUs.name}</td>
                <td className="border border-slate-100">{contactUs.email}</td>
                <td className="border border-slate-100">{contactUs.subject}</td>
                <td className="border border-slate-100">{contactUs.message}</td>
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

export default ContactUs;
