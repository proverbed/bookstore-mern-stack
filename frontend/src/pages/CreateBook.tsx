import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "./Home";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";

const CreateBook: React.FC = () => {
  const PATH: string = BACKEND_URL + "/books";
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<number>(0);
  const navigate = useNavigate();
  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    axios
      .post(PATH, data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("An error occurred");
      });
  };
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
        <div className="flex  md:w-1/2 w-full flex-col gap-6">
          <Input
            variant="outlined"
            label="title"
            placeholder="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            crossOrigin={undefined}
          />
          <Input
            variant="outlined"
            label="author"
            value={author}
            placeholder="author"
            required
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            crossOrigin={undefined}
          />
          <Input
            variant="outlined"
            label="publish year"
            type="number"
            value={publishYear}
            required
            onChange={(e) => {
              setPublishYear(Number(e.target.value));
            }}
            placeholder="publish year"
            crossOrigin={undefined}
          />

          <div className="mt-60 flex ">
            <Button
              size="sm"
              variant="filled"
              placeholder={"undefined"}
              onClick={handleSaveBook}
            >
              Save
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CreateBook;
