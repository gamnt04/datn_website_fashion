import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X } from "lucide-react";
import CreateComponent from "./Create";

export default function CategoryCreate() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{
          color: "white",
          padding: 1,
          minWidth: "auto",
          background: "blue",
        }}
        onClick={handleClickOpen}
      >
        Thêm danh mục
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div
            className="absolute top-2 right-2 cursor-pointer"
            onClick={handleClose}
          >
            <X />
          </div>
        </DialogTitle>
        <DialogContent>
          <Box className="p-5">
            <CreateComponent />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
