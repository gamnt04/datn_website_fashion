import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import Attribute from "../../models/attribute/attribute";

// list all
export const getAllProducts = async (req, res) => {
  const { _search = "" } = req.query;
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") }
        }
      ];
    }
    const products = await Products.find(querry);
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      products
    });
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !"
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
    _category_id = ""
  } = req.query;
  const options = {
    page: _page,
    limit: _limit
  };
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") }
        }
      ];
    }
    const data = await Products.paginate(querry, options);
    await Products.populate(data.docs, { path: "attributes" });
    for (const id_data of data.docs) {
      if (id_data.attributes) {
        let total_stock = 1;
        id_data.attributes.values.map((i) => {
          i.size.map((l) => {
            total_stock += l.stock_attribute;
          });
        });
        id_data.stock_product = total_stock;
      } else {
        id_data.stock_product = id_data.stock;
      }
    }
    data.docs = data.docs.filter((item) => item.stock_product > 0);
    if (!data || data.length < 1) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Khong co data!"
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Done !",
      data
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Loi server !"
    });
  }
}

export async function get_item_dashboard(req, res) {
  const { _page = 1, _limit = 30, _sort = "" } = req.query;
  try {
    const options = {
      page: _page,
      limit: _limit
    };
    const data = await Products.paginate({}, options);
    return res.status(StatusCodes.OK).json({
      message: "OK",
      data
    });
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
      product.attributes.values = product.attributes.values.map((item) => {
        const new_data = item.size.filter((attr) => attr.stock_attribute > 0);
        return {
          ...item,
          size: new_data
        };
      });
    }
    await product.save();
    return res.status(StatusCodes.OK).json({
      product
    });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !"
    });
  }
};

export async function filterItems(req, res) {
  const { cate_id, color, name_size, price_ranges } = req.query;
  const { _page = 1, _limit = 20, _sort = "" } = req.query;

  const page = parseInt(_page, 10) || 1;
  const limit = parseInt(_limit, 10) || 20;

  const options = {
    page,
    limit,
    sort: _sort
      ? { [_sort.split(":")[0]]: _sort.split(":")[1] === "desc" ? -1 : 1 }
      : { "attributes.values.size.price_attribute": 1 }
  };

  try {
    const query = {};

    if (cate_id) {
      const cateArray = cate_id.split(",").map((id) => id.trim());
      query.category_id = { $in: cateArray };
    }

    if (price_ranges) {
      try {
        const priceRangesArray = JSON.parse(price_ranges);
        query.$or = priceRangesArray.map((range) => ({
          price_product: {
            $gte: parseFloat(range.min),
            $lte: parseFloat(range.max)
          }
        }));
      } catch (e) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Lỗi trong việc phân tích giá.", error: e.message });
      }
    }

    const colorArray = color
      ? color.split(",").map((c) => c.trim().toLowerCase())
      : [];
    const sizeArray = name_size
      ? name_size.split(",").map((s) => s.trim().toLowerCase())
      : [];

    const data = await Products.paginate(query, options);
    const filteredProducts = [];

    if (!data || data.docs.length < 1) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy dữ liệu!", query, data });
    }

    for (let item of data.docs) {
      let total_stock = 0;
      let matched = false;
      let minPrice = Infinity;
      let maxPrice = -Infinity;

      if (item.attributes) {
        const attr = await Attribute.findOne({ id_item: item._id.toString() });

        if (attr && Array.isArray(attr.values)) {
          attr.values.forEach((value) => {
            const colorMatch =
              colorArray.length === 0 ||
              colorArray.includes(value.color.toLowerCase());
            const sizeMatch =
              sizeArray.length === 0 ||
              (Array.isArray(value.size) &&
                value.size.some((sizeObj) =>
                  sizeArray.includes(sizeObj.name_size.toLowerCase())
                ));

            if (colorMatch && sizeMatch) {
              matched = true;
              if (Array.isArray(value.size)) {
                value.size.forEach((sizeObj) => {
                  if (
                    sizeArray.length === 0 ||
                    sizeArray.includes(sizeObj.name_size.toLowerCase())
                  ) {
                    total_stock += sizeObj.stock_attribute;
                    // Cập nhật giá nhỏ nhất và lớn nhất
                    if (sizeObj.price_attribute < minPrice)
                      minPrice = sizeObj.price_attribute;
                    if (sizeObj.price_attribute > maxPrice)
                      maxPrice = sizeObj.price_attribute;
                  }
                });
              }
            }
          });
        }

        if (matched) {
          item.stock_product = total_stock;
          item.price_product = minPrice; // Sử dụng giá nhỏ nhất để sắp xếp
          filteredProducts.push(item);
        }
      } else {
        item.stock_product = item.stock;
        filteredProducts.push(item);
      }
    }

    // Sắp xếp các sản phẩm đã lọc theo giá
    if (_sort.includes("price_attribute")) {
      filteredProducts.sort((a, b) => {
        const sortOrder = _sort.split(":")[1] === "desc" ? -1 : 1;
        return (a.price_product - b.price_product) * sortOrder;
      });
    }

    if (filteredProducts.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm phù hợp với các tiêu chí!" });
    }

    return res.status(StatusCodes.OK).json({
      message: "Thành công!",
      data: filteredProducts,
      pagination: {
        totalItems: data.totalDocs,
        currentPage: data.page,
        totalPages: data.totalPages,
        itemsPerPage: data.limit
      }
    });
  } catch (error) {
    console.error("Server Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Lỗi máy chủ!" });
  }
}

export const getProductsByName = async (req, res) => {
  try {
    const { searchName } = req.body;
    const products = await Products.find({
      name_product: { $regex: new RegExp(searchName, "i") }
    });
    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không Có Sản Phẩm Nào" });
    }
    return res.status(StatusCodes.OK).json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message || "Lỗi máy chủ!" });
  }
};
