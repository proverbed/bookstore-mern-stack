import { useEffect, useState } from "react";
import { BACKEND_URL, Book } from "./Home";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Button } from "@material-tailwind/react";
import DeleteBookDialog from "../components/DeleteBookDialog";

type ShowbookParams = {
  id: string;
};

const ShowBook: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<ShowbookParams>();
  const PATH: string = BACKEND_URL + "/books/" + id;
  const [loading, setLoading] = useState<boolean>();
  const [book, setBook] = useState<Book>({
    _id: "",
    author: "",
    title: "",
    createdAt: "",
    updatedAt: "",
    publishYear: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(PATH)
      .then((response) => {
        if (response.data === null) {
          // Navigate to 404 page
          navigate("*");
        } else {
          setBook(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleDelete = () => {
    setLoading(true);

    axios
      .delete(PATH)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
        <div className="flex flex-row gap-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 w-1/3"
            placeholder={undefined}
          >
            Title:
          </Typography>

          {loading ? (
            <div className="mb-2 w-1/3 p-1 bg-blue-gray-100 rounded-sm"></div>
          ) : (
            <Typography
              variant="lead"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
            >
              {`${book.title}`}
            </Typography>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 w-1/3"
            placeholder={undefined}
          >
            Author:
          </Typography>
          {loading ? (
            <div className="mb-2 w-1/5 p-1 bg-blue-gray-100 rounded-sm"></div>
          ) : (
            <Typography
              variant="lead"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
            >
              {`${book.author}`}
            </Typography>
          )}
        </div>
        <div className="flex flex-row gap-4">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 w-1/3"
            placeholder={undefined}
          >
            Publish Year:
          </Typography>

          {loading ? (
            <div className="mb-2 w-1/6 p-1 bg-blue-gray-100 rounded-sm"></div>
          ) : (
            <Typography
              variant="lead"
              color="blue-gray"
              className="mb-2"
              placeholder={undefined}
            >
              {`${book.publishYear}`}
            </Typography>
          )}
        </div>

        <div className="mt-60 flex ">
          <Button
            size="sm"
            variant="outlined"
            className="mr-2"
            onClick={() => {
              navigate("/books/edit/" + id);
            }}
            placeholder={undefined}
          >
            Edit
          </Button>

          <Button
            onClick={handleOpen}
            variant="gradient"
            size="sm"
            placeholder={undefined}
          >
            Delete Book
          </Button>
        </div>
      </section>

      <DeleteBookDialog
        handleOpen={handleOpen}
        handleDelete={handleDelete}
        open={open}
      />
    </div>
  );
};

export default ShowBook;
