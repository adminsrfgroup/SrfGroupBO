import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { useFormik } from "formik";
import {
  initialValuesCguAddUpdate,
  validationSchemaCguAddUpdaten
} from "../../../lib/cgu/validations/validation-cgu";
import { CustomSunEditor } from "@components/sun-editor/CustomSunEditor";
import { Button } from "primereact/button";
import { useCgu } from "../../../lib/cgu/hooks/useCgu";
import { useRouter } from "next/router";

const initialValues = initialValuesCguAddUpdate;
export default function AddCgu() {
  const router = useRouter();

  const { addNewCgu, addSuccessCguSelector } = useCgu();

  React.useEffect(() => {
    if (addSuccessCguSelector) {
      router.push("/cgu/list-cgu");
    }
  }, [addSuccessCguSelector]);

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaCguAddUpdaten,
    onSubmit: (values) => {
      console.log(values);
      addNewCgu(values);
    }
  });

  const onEditorStateChangeAr = (editorState: any) => {
    formik.setFieldValue("contentAr", editorState);
  };

  const onEditorStateChangeFr = (editorState: any) => {
    formik.setFieldValue("contentFr", editorState);
  };
  const onEditorStateChangeEn = (editorState: any) => {
    formik.setFieldValue("contentEn", editorState);
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main p-3">
        <form onSubmit={formik.handleSubmit}>
          <h2>Create or edit a CGU</h2>

          <div className="flex flex-col w-full">
            <div className="mb-5">
              <CustomSunEditor
                defaultValue=""
                callbcakHandleChange={onEditorStateChangeAr}
              />
              <span className="text-xs text-red-700" id="questionAr">
                {formik.touched.contentAr && formik.errors.contentAr}
              </span>
            </div>
            <div className="mb-5">
              <CustomSunEditor
                defaultValue=""
                callbcakHandleChange={onEditorStateChangeFr}
              />
              <span className="text-xs text-red-700" id="questionAr">
                {formik.touched.contentFr && formik.errors.contentFr}
              </span>
            </div>
            <div className="mb-5">
              <CustomSunEditor
                defaultValue=""
                callbcakHandleChange={onEditorStateChangeEn}
              />
              <span className="text-xs text-red-700" id="questionAr">
                {formik.touched.contentEn && formik.errors.contentEn}
              </span>
            </div>
          </div>

          <div className="flex flex-row-reverse ...">
            <Button
              label="Add/Update CGU"
              className="p-button-success"
              type="submit"
            />
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
