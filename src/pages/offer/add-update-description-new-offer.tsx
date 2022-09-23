import React from "react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CustomSunEditor } from "../../components/sun-editor/CustomSunEditor";
import { useFormik } from "formik";
import {
  initialValuesAddUpdateDescriptionAddOffer,
  validationSchemaAddUpdateDescriptionAddOffer
} from "../../lib/offer/validation/initial-values-add-update-descriptionadd-offer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addSuccessDescriptionNewOffer,
  addDescriptionNewOffer,
  resetDescriptionNewOffer
} from "@store/offer/slice";

const initialValues = initialValuesAddUpdateDescriptionAddOffer;

export default function AddUpdateDescriptionNewOffer() {
  const dispatch = useDispatch();
  const router = useRouter();

  const addSuccessDescriptionNewOfferSelector =
    useSelector(addSuccessDescriptionNewOffer) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddUpdateDescriptionAddOffer,
    onSubmit: (values) => {
      dispatch(addDescriptionNewOffer({ ...values }));
      // props.createEntity(values);
    }
  });

  React.useEffect(() => {
    if (addSuccessDescriptionNewOfferSelector) {
      dispatch(resetDescriptionNewOffer({}));
      router.push("/offer/description-new-offer");
    }
  }, [addSuccessDescriptionNewOfferSelector]);

  const onEditorStateChangeAr = (editorState: any) => {
    formik.setFieldValue("descriptionAr", editorState);
  };
  const onEditorStateChangeFr = (editorState: any) => {
    formik.setFieldValue("descriptionFr", editorState);
  };
  const onEditorStateChangeEn = (editorState: any) => {
    formik.setFieldValue("descriptionEn", editorState);
  };

  return (
    <div>
      <SideBar />
      <Header />
      <main className="container-main">
        <div>
          <form onSubmit={formik.handleSubmit}>
            <h2>Create or edit a Description AddOffer</h2>
            <div className="flex flex-col w-full">
              <div className="mb-5">
                <CustomSunEditor
                  defaultValue=""
                  callbcakHandleChange={onEditorStateChangeAr}
                />
                <span className="text-xs text-red-700" id="descriptionAr">
                  {formik.touched.descriptionAr && formik.errors.descriptionAr}
                </span>
              </div>
              <div className="mb-5">
                <CustomSunEditor
                  defaultValue=""
                  callbcakHandleChange={onEditorStateChangeFr}
                />
                <span className="text-xs text-red-700" id="descriptionFr">
                  {formik.touched.descriptionFr && formik.errors.descriptionFr}
                </span>
              </div>
              <div className="mb-5">
                <CustomSunEditor
                  defaultValue=""
                  callbcakHandleChange={onEditorStateChangeEn}
                />
                <span className="text-xs text-red-700" id="descriptionEn">
                  {formik.touched.descriptionEn && formik.errors.descriptionEn}
                </span>
              </div>
            </div>

            <div className="flex flex-row-reverse ...">
              <div>
                <button
                  className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                  type="submit">
                  Add new Description
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
