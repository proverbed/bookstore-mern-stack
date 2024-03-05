import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./Home";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreateBook: React.FC = () => {
  const PATH: string = BACKEND_URL + "/books";
  const navigate = useNavigate();
  const bookSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    publishYear: Yup.number()
      .min(1000, `Publish year can't be less than 1000`)
      .max(new Date().getFullYear(), `Publish year can't be in the future`)
      .required("Publish year is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publishYear: "",
    },
    onSubmit: (values) => {
      axios
        .post(PATH, values)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred");
        });
    },
    validationSchema: bookSchema,
  });
  return (
    <div className="mx-auto w-full max-w-7xl">
      <section
        id="header"
        className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Book Details</h2>
        </div>
      </section>
      <section className="p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 leading-6">
        <form
          onSubmit={formik.handleSubmit}
          className="flex  md:w-1/2 w-full flex-col gap-6"
        >
          <Input
            variant="outlined"
            label="title"
            placeholder="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            crossOrigin={undefined}
          />
          <div className="text-sm text-slate-700">
            {formik.errors.title && formik.touched.title && formik.errors.title}
          </div>
          <Input
            variant="outlined"
            label="author"
            value={formik.values.author}
            placeholder="author"
            name="author"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            crossOrigin={undefined}
          />
          <div className="text-sm text-slate-700">
            {formik.errors.author &&
              formik.touched.author &&
              formik.errors.author}
          </div>
          <Input
            variant="outlined"
            label="publish year"
            name="publishYear"
            type="number"
            value={formik.values.publishYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="publish year"
            crossOrigin={undefined}
          />
          <div className="text-sm text-slate-700">
            {formik.errors.publishYear &&
              formik.touched.publishYear &&
              formik.errors.publishYear}
          </div>
          <div className="mt-60 flex ">
            <Button
              size="sm"
              variant="filled"
              placeholder={"undefined"}
              type="submit"
            >
              Save
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default CreateBook;
