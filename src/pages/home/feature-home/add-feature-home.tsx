import SideBar from "../../../components/SideBar";
import Header from "../../../components/Header";
import { CustomSunEditor } from "../../../components/sun-editor/CustomSunEditor";
import Footer from "../../../components/Footer";
import React from "react";
import { useFormik } from "formik";
import {
  initialValuesPostHomeFeature,
  validationSchemaPostHomeFeature
} from "../../../lib/home/validation/validation-home";
import { dataUrlToFile, getBase64 } from "../../../lib/utils-functions";
import { isEmpty } from "fast-glob/out/utils/string";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  addSuccessFeatureHome,
  entityFeatureHome,
  addFeatureHome,
  resetFeatureHome
} from "@store/home/slice";

const initialValues = initialValuesPostHomeFeature;

export default function AddUpdateFeatureHome() {
  const [fileState, setFileState] = React.useState("");
  // const [imageUpload, setImageUpload] = React.useState<any>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const entityFeatureHomeSelector = useSelector(entityFeatureHome) ?? {};
  const addSuccessFeatureHomeSelector =
    useSelector(addSuccessFeatureHome) ?? false;

  // const history = useHistory();

  const id = ""; // useParams<{ id: string }>();

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaPostHomeFeature,
    onSubmit: (values) => {
      const entity = {
        ...values,
        image: fileState
      };
      dispatch(addFeatureHome({ ...entity }));
    }
  });

  const selectFile = (event: any) => {
    getBase64(event.target.files[0]).then((result: any) => {
      dataUrlToFile(result, event.target.files[0].name).then((value: any) => {
        console.log("value ", value);
        // setImageUpload(value);
      });
      setFileState(result);
    });
  };

  React.useEffect(() => {
    console.log("id = ", id);
    if (id) {
      // props.getEntity(Number(id));
    }
  }, [id]);

  React.useEffect(() => {
    if (!isEmpty(entityFeatureHomeSelector)) {
      console.log("entityFeatureHomeSelector ", entityFeatureHomeSelector);
      formik.setFieldValue(
        "descriptionAr",
        entityFeatureHomeSelector.descriptionAr
      );
      formik.setFieldValue(
        "descriptionFr",
        entityFeatureHomeSelector.descriptionFr
      );
      formik.setFieldValue(
        "descriptionEn",
        entityFeatureHomeSelector.descriptionEn
      );
      setFileState(entityFeatureHomeSelector.image || "");
    }
  }, [entityFeatureHomeSelector]);

  React.useEffect(() => {
    if (addSuccessFeatureHomeSelector) {
      dispatch(resetFeatureHome({}));
      router.push("/home/feature-home");
    }
  }, [addSuccessFeatureHomeSelector]);

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
            <span className="text-xs text-red-700" id="responseAr">
              aze
            </span>
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
                      defaultValue={
                        entityFeatureHomeSelector.descriptionAr || ""
                      }
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
                      defaultValue={
                        entityFeatureHomeSelector.descriptionFr || ""
                      }
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
                      defaultValue={
                        entityFeatureHomeSelector.descriptionEn || ""
                      }
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
            <div>
              <button
                className="px-6 py-2  my-2 rounded bg-stone-400 hover:bg-stone-500 text-stone-100"
                type="submit">
                Add Feature Home
              </button>
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
