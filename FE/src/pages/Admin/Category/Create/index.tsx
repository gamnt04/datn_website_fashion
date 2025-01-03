import * as React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { X } from "lucide-react";
import CreateComponent from "./Create";
import { Button, Spin } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { LoadingOutlined } from "@ant-design/icons";

export default function CategoryCreate() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false); // Thêm state cho loading
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }
  return (
    <div>
      <Button
        className="px-[6px] h-[38px] text-[14px] font-semibold border-[#1976D2] text-[#1976D2]"
        onClick={handleClickOpen}
      >
        <AiOutlinePlus className="ml-[3px]" /> THÊM MỚI DANH MỤC
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <div
            className="absolute cursor-pointer top-2 right-2"
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
