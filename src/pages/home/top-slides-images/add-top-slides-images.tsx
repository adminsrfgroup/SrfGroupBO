import React from "react";
import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getBase64 } from "../../../lib/utils-functions";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import {
  initialValuesTopHomeSlidesImage,
  validationSchemaTopHomeSlidesImage
} from "../../../lib/home/validation/validation-home";
import { isEmpty } from "fast-glob/out/utils/string";
import { useDispatch, useSelector } from "react-redux";
import { CustomSunEditor } from "../../../components/sun-editor/CustomSunEditor";
import {
  addSuccessTopSlides,
  entityTopSlides,
  addTopSlides,
  resetTopSlides,
  fetchTopSlidesById,
  updateTopSlides,
  updateSuccessTopSlides
} from "@store/home/slice";
import { Button } from "primereact/button";

const initialValues = initialValuesTopHomeSlidesImage;

export default function AddTopSlidesImages({ id }: { id: string | string[] }) {
  const [fileState, setFileState] = React.useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const entityTopSlidesSelector = useSelector(entityTopSlides) ?? {};
  const addSuccessTopSlidesSelector = useSelector(addSuccessTopSlides) ?? false;
  const updateSuccessTopSlidesSelector =
    useSelector(updateSuccessTopSlides) ?? false;

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaTopHomeSlidesImage,
    onSubmit: (values) => {
      const entity = {
        ...values,
        image: fileState
      };
      console.log("entity ", entity);

      if (id) {
        dispatch(
          updateTopSlides({
            id: id,
            ...entity
          })
        );
      } else {
        dispatch(addTopSlides({ ...entity }));
      }
      //
    }
  });

  React.useEffect(() => {
    console.log("id == ", id);
    if (id) {
      dispatch(fetchTopSlidesById({ id: id }));
    }
  }, [id]);

  const selectFile = (event: any) => {
    getBase64(event.target.files[0]).then((result: any) => {
      setFileState(result);
    });
  };

  React.useEffect(() => {
    if (!isEmpty(entityTopSlidesSelector)) {
      console.log("entityTopSlidesSelector ", entityTopSlidesSelector);
      formik.setFieldValue(
        "descriptionAr",
        entityTopSlidesSelector.descriptionAr
      );
      formik.setFieldValue(
        "descriptionFr",
        entityTopSlidesSelector.descriptionFr
      );
      formik.setFieldValue(
        "descriptionEn",
        entityTopSlidesSelector.descriptionEn
      );
      setFileState(entityTopSlidesSelector.image || "");
    }
  }, [entityTopSlidesSelector]);

  React.useEffect(() => {
    if (addSuccessTopSlidesSelector || updateSuccessTopSlidesSelector) {
      dispatch(resetTopSlides({}));
      router.push("/home/top-slides-images");
    }
  }, [addSuccessTopSlidesSelector, updateSuccessTopSlidesSelector]);

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
      <main className="container-main p-2">
        <div className="mb-5">
          <div className="p-5 text-gray-700">
            <label className="block mb-1" htmlFor="responseAr">
              Image
            </label>
            <input
              id="descriptionAr"
              name="descriptionAr"
              type="file"
              placeholder="descriptionAr..."
              className={
                "w-full px-3 text-base placeholder-gray-600 border border-green-700 rounded-lg focus:shadow-outline"
              }
              aria-describedby="responseAr"
              onChange={selectFile}
            />
          </div>

          <div>
            <img src={fileState} width={250} height={250} />
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <table className="border-collapse border border-slate-400 w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-slate-300 p-3" colSpan={3}>
                  Inputs
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="border border-slate-300 ...">
                  <div className="p-5 text-gray-700">
                    <label className="block mb-1" htmlFor="descriptionAr">
                      descriptionAr
                    </label>
                    <CustomSunEditor
                      defaultValue={entityTopSlidesSelector.descriptionAr || ""}
                      callbcakHandleChange={onEditorStateChangeAr}
                    />
                    <span className="text-xs text-red-700" id="descriptionAr">
                      {formik.touched.descriptionAr &&
                        formik.errors.descriptionAr}
                    </span>
                  </div>
                </td>

                <td className="border border-slate-300 ...">
                  <div className="p-5 text-gray-700">
                    <label className="block mb-1" htmlFor="descriptionFr">
                      descriptionFr
                    </label>
                    <CustomSunEditor
                      defaultValue={entityTopSlidesSelector.descriptionFr || ""}
                      callbcakHandleChange={onEditorStateChangeFr}
                    />
                    <span className="text-xs text-red-700" id="descriptionFr">
                      {formik.touched.descriptionFr &&
                        formik.errors.descriptionFr}
                    </span>
                  </div>
                </td>

                <td className="border border-slate-300 ...">
                  <div className="p-5 text-gray-700">
                    <label className="block mb-1" htmlFor="descriptionEn">
                      descriptionEn
                    </label>
                    <CustomSunEditor
                      defaultValue={entityTopSlidesSelector.descriptionEn || ""}
                      callbcakHandleChange={onEditorStateChangeEn}
                    />
                    <span className="text-xs text-red-700" id="descriptionEn">
                      {formik.touched.descriptionEn &&
                        formik.errors.descriptionEn}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-row-reverse ...">
            {id ? (
              <Button
                type="submit"
                label={"Update"}
                className={"p-button-info"}
              />
            ) : (
              <Button type="submit" label={"Add"} className={"p-button-info"} />
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
