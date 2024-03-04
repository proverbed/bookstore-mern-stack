import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export type Book = {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt: string;
  updatedAt: string;
};

export const BACKEND_URL: string = "http://localhost:5555";

const Home: React.FC = () => {
  const PATH: string = BACKEND_URL + "/books";
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(PATH)
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const NewBook = () => {
    return (
      <li className="flex">
        <Link
          to={"/books/create"}
          className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3"
        >
          <svg
            className="group-hover:text-blue-500 mb-1 text-slate-400"
            width="20"
            height="20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
          </svg>
          New book
        </Link>
      </li>
    );
  };

  return (
    <>
      <section className="mx-auto w-full max-w-7xl">
        <section
          id="header"
          className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Books</h2>
          </div>
        </section>
        <section id="books">
          {loading ? (
            <div id="loading">
              <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
                <li className="grid rounded-md bg-gray-200"></li>
                <NewBook />
              </ul>
            </div>
          ) : (
            <ul className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
              {books.map((book: Book) => (
                <li key={book._id} className="grid">
                  <Link
                    to={"/books/details/" + book._id}
                    className="hover:bg-blue-500 hover:ring-blue-500 hover:shadow-md group rounded-md p-3 bg-white ring-1 ring-slate-200 shadow-sm"
                  >
                    <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                      <div>
                        <dt className="sr-only">Title - Author</dt>
                        <dd className="group-hover:text-white font-semibold text-slate-900">
                          {`${book.title} - ${book.author}`}
                        </dd>
                      </div>
                      <div>
                        <dt className="sr-only">Publish Year</dt>
                        <dd className="group-hover:text-blue-200">
                          {book.publishYear}
                        </dd>
                      </div>
                    </dl>
                  </Link>
                </li>
              ))}
              <NewBook />
            </ul>
          )}
        </section>
      </section>
    </>
  );
};

export default Home;
