import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import MongooseDelete from "mongoose-delete";

export async function restore_item(req, res) {
  try {
    const product = await Products.restore({ _id: req.params.id });
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm để khôi phục" });
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Khôi phục sản phẩm thành công", data: product });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}


export const getTrash = async (req, res) => {

  try {
    const trashProducts = await Products.find({ deleted: true });
    res.status(StatusCodes.OK).json(trashProducts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};