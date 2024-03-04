import { Link } from "react-router-dom";

const StickyNavbar: React.FC = () => {
  return (
    <nav className="sticky top-0 z-10 h-max mx-auto w-full max-w-7xl rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/" className="mr-4 cursor-pointer py-1.5 font-medium">
          Bookstore
        </Link>
      </div>
    </nav>
  );
};

export default StickyNavbar;
