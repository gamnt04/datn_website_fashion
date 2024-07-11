import Products from "../../models/Items/Products";
import { StatusCodes } from "http-status-codes";

export const deleteProductById = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { deletedAt: new Date() },
      { new: true }
    );
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
      .json({ error: error.message });
  }
};

export async function destroy_delete(req, res) {
  try {
    await Products.findByIdAndDelete(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Xóa vĩnh viễn thành công" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}
