import Attribute from "../../models/attribute/attribute";
import Products from "../../models/Items/Products";
import { StatusCodes } from "http-status-codes";

export const deleteProductById = async (req, res) => {
  try {
    const product = await Products.delete({_id : req.params.id});
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm để xóa" }); 
    }
    return res
      .status(StatusCodes.OK)
      .json({ message: "Đã xóa sản phẩm thành công" });
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message || "Lỗi server!",});
  }
};

export async function destroy_delete(req, res) {
  try {
    await Products.findByIdAndDelete(req.params.id);
    await Attribute.deleteMany({id_item : req.params.id});
    return res
      .status(StatusCodes.OK)
      .json({ message: "Xóa vĩnh viễn thành công" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}
