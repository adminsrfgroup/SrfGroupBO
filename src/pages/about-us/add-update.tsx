import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  initialValuesAboutUsAddUpdate,
  validationSchemaAboutUsAddUpdaten
} from "../../lib/about-us/validation/validation-about-us-add-update";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CustomSunEditor } from "../../components/sun-editor/CustomSunEditor";
import { useAboutUs } from "../../lib/about-us/hooks/useAboutUs";

const initialValues = initialValuesAboutUsAddUpdate;

export default function AddUpdateAboutUs() {
  const router = useRouter();

  const { addSuccessAboutUsSelector, addAboutUsAboutUs } = useAboutUs();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAboutUsAddUpdaten,
    onSubmit: (values) => {
      addAboutUsAboutUs({ ...values });
    }
  });

  React.useEffect(() => {
    if (addSuccessAboutUsSelector) {
      router.push("/about-us");
    }
  }, [addSuccessAboutUsSelector]);

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
      <main className="container-main">
        <div className="rounded-2xl p-2 bg-white">
          <form onSubmit={formik.handleSubmit}>
            <h2>Create or edit a Faq</h2>

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
              <div>
                <button
                  className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                  type="submit">
                  Add new AboutUs
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
