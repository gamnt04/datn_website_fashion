import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X } from "lucide-react";
import CreateComponent from "./AddProduct";

export default function AddProduct() {
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
        sx={{ color: "inherit", padding: 0, minWidth: "auto" }}
        onClick={handleClickOpen}
      >
        Thêm sản phẩm
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div className="text-center">Thêm Sản phẩm</div>
          <div
            className="absolute top-0 right-0 cursor-pointer"
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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
