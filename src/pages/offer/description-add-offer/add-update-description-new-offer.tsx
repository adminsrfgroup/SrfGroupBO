import React from "react";
import SideBar from "@components/SideBar";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { CustomSunEditor } from "@components/sun-editor/CustomSunEditor";
import { useFormik } from "formik";
import {
  initialValuesAddUpdateDescriptionAddOffer,
  validationSchemaAddUpdateDescriptionAddOffer
} from "../../../lib/offer/validation/initial-values-add-update-descriptionadd-offer";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addSuccessDescriptionNewOffer,
  addDescriptionNewOffer,
  resetDescriptionNewOffer,
  fetchDescriptionByIdNewOffer,
  entityDescriptionNewOffer,
  updateDescriptionNewOffer,
  updateSuccessDescriptionNewOffer
} from "@store/offer/slice";
import { isEmpty } from "fast-glob/out/utils/string";
import { Button } from "primereact/button";

const initialValues = initialValuesAddUpdateDescriptionAddOffer;

export default function AddUpdateDescriptionNewOffer({
  id
}: {
  id: string | string[];
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const entityDescriptionNewOfferSelector =
    useSelector(entityDescriptionNewOffer) ?? {};
  const addSuccessDescriptionNewOfferSelector =
    useSelector(addSuccessDescriptionNewOffer) ?? false;
  const updateSuccessDescriptionNewOfferSelector =
    useSelector(updateSuccessDescriptionNewOffer) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAddUpdateDescriptionAddOffer,
    onSubmit: (values) => {
      if (id) {
        dispatch(
          updateDescriptionNewOffer({
            id: id,
            ...values
          })
        );
      } else {
        dispatch(addDescriptionNewOffer({ ...values }));
      }
    }
  });

  React.useEffect(() => {
    if (id) {
      dispatch(fetchDescriptionByIdNewOffer({ id: id }));
    }
  }, [id]);

  React.useEffect(() => {
    if (
      addSuccessDescriptionNewOfferSelector ||
      updateSuccessDescriptionNewOfferSelector
    ) {
      dispatch(resetDescriptionNewOffer({}));
      router.push("/offer/description-add-offer/description-new-offer");
    }
  }, [
    addSuccessDescriptionNewOfferSelector,
    updateSuccessDescriptionNewOfferSelector
  ]);

  React.useEffect(() => {
    if (!isEmpty(entityDescriptionNewOfferSelector)) {
      formik.setFieldValue(
        "descriptionAr",
        entityDescriptionNewOfferSelector.descriptionAr
      );
      formik.setFieldValue(
        "descriptionFr",
        entityDescriptionNewOfferSelector.descriptionFr
      );
      formik.setFieldValue(
        "descriptionEn",
        entityDescriptionNewOfferSelector.descriptionEn
      );
    }
  }, [entityDescriptionNewOfferSelector]);

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
                  defaultValue={entityDescriptionNewOfferSelector.descriptionAr}
                  callbcakHandleChange={onEditorStateChangeAr}
                />
                <span className="text-xs text-red-700" id="descriptionAr">
                  {formik.touched.descriptionAr && formik.errors.descriptionAr}
                </span>
              </div>
              <div className="mb-5">
                <CustomSunEditor
                  defaultValue={entityDescriptionNewOfferSelector.descriptionFr}
                  callbcakHandleChange={onEditorStateChangeFr}
                />
                <span className="text-xs text-red-700" id="descriptionFr">
                  {formik.touched.descriptionFr && formik.errors.descriptionFr}
                </span>
              </div>
              <div className="mb-5">
                <CustomSunEditor
                  defaultValue={entityDescriptionNewOfferSelector.descriptionEn}
                  callbcakHandleChange={onEditorStateChangeEn}
                />
                <span className="text-xs text-red-700" id="descriptionEn">
                  {formik.touched.descriptionEn && formik.errors.descriptionEn}
                </span>
              </div>
            </div>

            <div className="flex flex-row-reverse ...">
              {id ? (
                <Button
                  type="submit"
                  label={"Update"}
                  className={"p-button-info"}
                />
              ) : (
                <Button
                  type="submit"
                  label={"Add"}
                  className={"p-button-info"}
                />
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
