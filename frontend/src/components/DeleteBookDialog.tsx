import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface Props {
  handleOpen: React.Dispatch<React.SetStateAction<any>>;
  handleDelete: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
}

const DeleteBookDialog: React.FC<Props> = ({
  handleOpen,
  handleDelete,
  open,
}: Props) => {
  return (
    <>
      <Dialog open={open} handler={handleOpen} placeholder={undefined}>
        <DialogHeader placeholder={undefined}>Delete Book</DialogHeader>
        <DialogBody placeholder={undefined}>
          Are you sure you want to delete this book?
        </DialogBody>
        <DialogFooter placeholder={undefined}>
          <Button
            variant="text"
            color="red"
            size="sm"
            onClick={handleOpen}
            className="mr-2"
            placeholder={undefined}
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            size="sm"
            onClick={handleDelete}
            placeholder={undefined}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DeleteBookDialog;
