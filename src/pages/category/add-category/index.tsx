import React from "react";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { ICategory } from "../../../lib/models/category.model";
import {
  initialValuesAddCategory,
  validationSchemaAddCategory
} from "../../../lib/category/validation/category_validation";
import { Image } from "primereact/image";
import { getBase64 } from "../../../lib/utils-functions";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, addSuccessCategories } from "@store/category/slice";
import { useRouter } from "next/router";

const initialValues = initialValuesAddCategory;

export default function AddCategory() {
  const [fileState, setFileState] = React.useState();

  const addSuccessCategoriesSelector =
    useSelector(addSuccessCategories) ?? false;

  const dispatch = useDispatch();
  const router = useRouter();

  React.useEffect(() => {
    if (addSuccessCategoriesSelector) {
      router.push("/category/list-categories");
    }
  }, [addSuccessCategoriesSelector]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddCategory,
    onSubmit: (values: ICategory) => {
      const entity = {
        ...values,
        imageContent: fileState
      };
      dispatch(addCategory({ ...entity }));
    }
  });

  const selectFile = (event: any) => {
    getBase64(event.target.files[0]).then((result: any) => {
      setFileState(result);
      formik.setFieldValue("imageContent", result);
    });
  };

  const isFormFieldValid = (
    name: "id" | "titleAr" | "titleFr" | "titleEn" | "imageContent"
  ) => !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (
    name: "id" | "titleAr" | "titleFr" | "titleEn" | "imageContent"
  ) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <div className="card">
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="card">
              <h5>Add new Category</h5>
            </div>

            <div className="card">
              <div className="formgrid grid">
                <div className="field col">
                  <label
                    htmlFor="username1"
                    className={classNames({
                      "p-error": isFormFieldValid("titleAr")
                    })}>
                    Title Ar*
                  </label>
                  <InputText
                    id="titleAr"
                    name="titleAr"
                    aria-describedby="titleAr-help"
                    className="p-inputtext-sm block"
                    value={formik.values.titleAr || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("titleAr")}
                </div>
                <div className="field col">
                  <label
                    htmlFor="username1"
                    className={classNames({
                      "p-error": isFormFieldValid("titleFr")
                    })}>
                    Title Fr*
                  </label>
                  <InputText
                    id="titleFr"
                    name="titleFr"
                    aria-describedby="username1-help"
                    className="p-inputtext-sm block"
                    value={formik.values.titleFr || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("titleFr")}
                </div>
                <div className="field col">
                  <label
                    htmlFor="username1"
                    className={classNames({
                      "p-error": isFormFieldValid("titleEn")
                    })}>
                    Title En*
                  </label>
                  <InputText
                    id="titleEn"
                    name="titleEn"
                    aria-describedby="username1-help"
                    className="p-inputtext-sm block"
                    value={formik.values.titleEn || ""}
                    onChange={formik.handleChange}
                  />
                  {getFormErrorMessage("titleEn")}
                </div>
              </div>
            </div>

            <div className="card">
              <h5>Basic</h5>
              <Image src={fileState} alt="Image" width="250" />
              <input
                type="file"
                onChange={selectFile}
                accept=".jpg, .jpeg, .png"
              />
              {getFormErrorMessage("imageContent")}
            </div>

            <Button type="submit" label="Submit" className="mt-2" />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
