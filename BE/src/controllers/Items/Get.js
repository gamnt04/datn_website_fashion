import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import Attribute from "../../models/attribute/attribute";

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
      message: error.message || "Loi server !",
    });
  }
};

// paginate
export async function get_items_client(req, res) {
  const {
    _page = 1,
    _sort = "",
    _limit = 20,
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
      querry.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") },
        },
      ];
    }
    const data = await Products.paginate(querry, options);
    for (let item of data.docs) {
      let total_stock = 0;
      if (item.attributes) {
        const attr = await Attribute.findOne({ id_item: item._id.toString() });
        if (attr) {
          attr.values.map((item) => {
            item.size.map((a) => {
              total_stock += a.stock_attribute;
            });
          });
        }
        item.stock_product = total_stock;
      } else {
        item.stock_product = item.stock;
      }
    }
    // console.log(data);
    if (!data || data.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Khong co data!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !",
    });
  }
}

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id).populate(
      "attributes"
    );
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.status(StatusCodes.OK).json({
      product,
    });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
};

export async function filter_item_category(req, res) {
  const { _page = 1, _sort = "", _limit = 20, _search = "" } = req.query;
  const options = {
    page: parseInt(_page, 10),
    limit: parseInt(_limit, 10),
    sort: _sort
      ? { [_sort.split(":")[0]]: _sort.split(":")[1] === "desc" ? -1 : 1 }
      : {},
  };
  try {
    const query = {
      category_id: req.params.cate_id,
    };

    if (_search) {
      query.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") },
        },
      ];
    }

    const data = await Products.paginate(query, options);
    for (let item of data.docs) {
      let total_stock = 0;
      if (item.attributes) {
        const attr = await Attribute.findOne({ id_item: item._id.toString() });
        if (attr) {
          attr.values.forEach((value) => {
            value.size.forEach((size) => {
              total_stock += size.stock_attribute;
            });
          });
        }
        item.stock_product = total_stock;
      } else {
        item.stock_product = item.stock;
      }
    }

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "No data found!",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Success!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Server error!",
    });
  }
}
