import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import Attribute from "../../models/attribute/attribute";

// list all
export const getAllProducts = async (req, res) => {
  const {
    _search = ''
  } = req.query
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          name_product: { $regex: new RegExp(_search, 'i') }
        }
      ]
    }
    const products = await Products.find(querry);
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


export async function get_item_dashboard(req, res) {
  const {
    _page = 1,
    _limit = 30,
    _sort = '',
  } = req.query;
  try {
    const options = {
      page: _page,
      limit: _limit
    }
    const data = await Products.paginate({}, options);
    return res.status(StatusCodes.OK).json({
      message: 'OK',
      data
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !"
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
    if (product.attributes.values) {
      product.attributes.values = product.attributes.values.map(item => {

        const new_data = item.size.filter(attr => attr.stock_attribute > 0);
        console.log(item);

        return {
          ...item,
          size: new_data
        }
      })
    }
    await product.save();
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

export async function filterItems(req, res) {
  const { cate_id } = req.query;
  const {
    _page = 1,
    _limit = 20,
    min_price = null,
    max_price = null,
    _sort = "",
  } = req.query;

  const page = parseInt(_page, 10) || 1;
  const limit = parseInt(_limit, 10) || 20;

  const options = {
    page,
    limit,
    sort: _sort
      ? { [_sort.split(":")[0]]: _sort.split(":")[1] === "desc" ? -1 : 1 }
      : { price_product: 1 },
  };

  try {
    const query = {};

    if (cate_id) {
      query.category_id = cate_id;
    }

    if (min_price !== null && max_price !== null) {
      const minPrice = parseFloat(min_price);
      const maxPrice = parseFloat(max_price);

      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Giá không hợp lệ!",
        });
      }
      query.price_product = { $gte: minPrice, $lte: maxPrice };
    } else if (min_price !== null) {
      const minPrice = parseFloat(min_price);

      if (isNaN(minPrice)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Giá không hợp lệ!",
        });
      }
      query.price_product = { $gte: minPrice };
    } else if (max_price !== null) {
      const maxPrice = parseFloat(max_price);

      if (isNaN(maxPrice)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Giá không hợp lệ!",
        });
      }
      query.price_product = { $lte: maxPrice };
    }

    const data = await Products.paginate(query, options);

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không tìm thấy dữ liệu!",
        query,
        data,
      });
    }

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

    return res.status(StatusCodes.OK).json({
      message: "Thành công!",
      data,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi máy chủ!",
    });
  }
}
