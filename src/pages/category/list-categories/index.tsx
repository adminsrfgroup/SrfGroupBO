import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "primereact/button";
import {
  entitiesCategories,
  importSuccessCategories,
  /*loadingEntitiesCategories, */ fetchCategories,
  resetCategories,
  importCategories
} from "@store/category/slice";

export default function ListCategories() {
  const dispatch = useDispatch();

  // const loadingEntitiesCategoriesSelector = useSelector(loadingEntitiesCategories) ?? false;
  const importSuccessCategoriesSelector =
    useSelector(importSuccessCategories) ?? false;
  const entitiesCategoriesSelector = useSelector(entitiesCategories) ?? [];

  React.useEffect(() => {
    dispatch(resetCategories({}));
    dispatch(
      fetchCategories({
        page: 0,
        size: 20,
        queryParams: ""
      })
    );
  }, []);

  const importActionCategories = () => {
    dispatch(importCategories({}));
    // props.importEntities();
  };

  React.useEffect(() => {
    if (importSuccessCategoriesSelector) {
      dispatch(resetCategories({}));
      dispatch(
        fetchCategories({
          page: 0,
          size: 20,
          queryParams: ""
        })
      );
    }
  }, [importSuccessCategoriesSelector]);

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div className="card">
          <div className="flex">
            <div className="flex-1">List of categories</div>
            <div className="">
              <Button
                label="Import "
                className="p-button-success"
                icon="pi pi-check"
                onClick={() => importActionCategories()}
                disabled={entitiesCategoriesSelector?.length}
              />
              <Button label="Add new Category" className="p-button-link" />
            </div>
          </div>
          <table className="border-collapse border border-slate-400 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-slate-300">ID</th>
                <th className="border border-slate-300">Title Ar</th>
                <th className="border border-slate-300">Title Fr</th>
                <th className="border border-slate-300">Title En</th>
                <th className="border border-slate-300">Actioins</th>
              </tr>
            </thead>

            {entitiesCategoriesSelector.map((category: any, i: number) => (
              <tbody className="bg-white" key={`entity-${i}`}>
                <tr>
                  <td className="border border-slate-100">{category.id}</td>
                  <td className="border border-slate-100">
                    {category.titleAr}
                  </td>
                  <td className="border border-slate-100">
                    {category.titleFr}
                  </td>
                  <td className="border border-slate-100">
                    {category.titleEn}
                  </td>
                  <td className="border border-slate-100">
                    <Button className="">Edit</Button>
                    <Button className="">Delete</Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
