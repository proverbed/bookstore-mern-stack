import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  author: string;
  title: string;
  publishYear: number;
}

const BookCard: React.FC<Props> = ({
  id,
  author,
  title,
  publishYear,
}: Props) => {
  return (
    <Card className="mt-6 w-96 shadow-xl p-10" placeholder={undefined}>
      <CardBody placeholder={undefined}>
        <Typography
          variant="h5"
          color="blue-gray"
          className="mb-2"
          placeholder={undefined}
        >
          {`${title} - ${author}`}
        </Typography>
        <Typography placeholder={undefined} variant="small">
          {publishYear}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0" placeholder={undefined}>
        <Link to={"/books/details/" + id}>
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
            placeholder={undefined}
          >
            View More
          </Button>
        </Link>
        <Link to={"/books/edit/" + id}>
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2"
            placeholder={undefined}
          >
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
