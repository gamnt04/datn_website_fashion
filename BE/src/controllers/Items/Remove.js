import Products from "../../models/Items/Products";
import { StatusCodes } from 'http-status-codes';

export const deleteProductById = async (req, res) => {
    try {
      const product = await Products.delete({_id : req.params.id});
      if (!product) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để xóa" });
      }
      return res.status(200).json({ message: "Đã xóa sản phẩm thành công" });
    } catch (error) {
      console.error("Error deleting product by ID:", error);
      return res.status(500).json({ error: error.message });
    }
  };

export async function destroy_delete (req, res) {
  try{ 
    await Products.findByIdAndDelete(req.params.id);
    return res.status(StatusCodes.OK).json({
      message : 'Delete Done',
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message : error.message || "Loi server"
    })
  }
}