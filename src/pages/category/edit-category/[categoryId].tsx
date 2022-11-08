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
import {
  entityCategories,
  updateCategory,
  fetchCategory,
  updateSuccessCategories
} from "@store/category/slice";
import { useRouter } from "next/router";

const initialValues = initialValuesAddCategory;

export default function EditCategory() {
  const [fileState, setFileState] = React.useState();

  const updateSuccessCategoriesSelector =
    useSelector(updateSuccessCategories) ?? false;
  // const loadingCategoriesSelector = useSelector(loadingCategories) ?? false;
  const entityCategoriesSelector = useSelector(entityCategories) ?? {};

  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryId } = router.query;

  React.useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory({ id: categoryId }));
    }
  }, [categoryId]);

  React.useEffect(() => {
    console.log("entityCategoriesSelector ", entityCategoriesSelector);
    if (entityCategoriesSelector?.id) {
      formik.setFieldValue("id", entityCategoriesSelector?.id);
      formik.setFieldValue("titleAr", entityCategoriesSelector?.titleAr);
      formik.setFieldValue("titleFr", entityCategoriesSelector?.titleFr);
      formik.setFieldValue("titleEn", entityCategoriesSelector?.titleEn);
      formik.setFieldValue(
        "imageContent",
        entityCategoriesSelector?.imageContent
      );
      formik.setFieldValue("index", entityCategoriesSelector?.index);
      setFileState(entityCategoriesSelector?.imageContent);
    }
  }, [entityCategoriesSelector]);

  React.useEffect(() => {
    if (updateSuccessCategoriesSelector) {
      router.push("/category/list-categories");
    }
  }, [updateSuccessCategoriesSelector]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddCategory,
    onSubmit: (values: ICategory) => {
      const entity = {
        ...values,
        imageContent: fileState
      };
      dispatch(updateCategory({ ...entity }));
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
              <div className="formgrid grid">
                <div className="field col-4">
                  <label htmlFor="username1" className="block">
                    Id
                  </label>
                  <InputText
                    id="id"
                    name="id"
                    aria-describedby="username1-help"
                    className="p-inputtext-sm block"
                    value={formik.values.id || ""}
                    onChange={formik.handleChange}
                    disabled={true}
                  />
                </div>
              </div>
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
