import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";

// list all
export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (!products || products.length < 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không có sản phẩm" });
    }
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      products,
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
};

// paginate
export async function get_items_client(req, res) {
  const {
    _page = 1,
    _sort = "",
    _limit = 12,
    _search = "",
    _category_id = "",
  } = req.query;
  const options = {
    page: _page,
    limit: _limit,
  };
  try {
    const querry = {};
    if (_search) {
      querry._searchQuery = _search;
    }
    if (_category_id) {
      querry.category_id = _category_id;
    }
    if (_search || _category_id) {
      querry.$and = [];
      if (_search) {
        querry.$and.push({
          name_product: { $regex: _search, $option: "i" },
        });
      }
    }
    const data = await Products.paginate(querry, options);
    if (!data || data.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không có dữ liệu!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
}

export const getProductById = async (req, res) => {
  try {
    if (req.params.id === "trash") {
      // Xử lý lấy danh sách sản phẩm đã xóa
      const trashProducts = await Products.find({ deletedAt: { $ne: null } });
      return res.status(StatusCodes.OK).json(trashProducts);
    }

    const product = await Products.findById(req.params.id);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
};

export const getTrash = async (req, res) => {
  try {
    const trashProducts = await Products.find({ deletedAt: { $ne: null } });
    res.status(StatusCodes.OK).json(trashProducts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
