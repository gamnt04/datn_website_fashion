import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import Attribute from "../../models/attribute/attribute";
import Category from "../../models/Items/Category";
import mongoose from "mongoose";

// list all
export const getAllProducts = async (req, res) => {
  const { _search = "" } = req.query;
  try {
    const querry = {};
    if (_search) {
      querry.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") },
        },
      ];
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
    const querry = {
      $and: [],
    };

    if (_search) {
      querry.$and.push({
        name_product: { $regex: new RegExp(_search, "i") },
      });
    }

    if (_category_id) {
      // Tìm kiếm các danh mục có trạng thái published là true và khớp với _category_id
      const category = await Category.findOne({
        _id: _category_id,
        published: true,
      });

      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Danh mục bị ẩn hoặc không tồn tại!",
        });
      }

      querry.$and.push({
        category_id: _category_id,
      });
    } else {
      // Tìm kiếm các sản phẩm mà danh mục của chúng có trạng thái published là true
      const visibleCategories = await Category.find({ published: true }).select(
        "_id"
      );

      const visibleCategoryIds = visibleCategories.map((cat) => cat._id);

      querry.$and.push({
        category_id: { $in: visibleCategoryIds },
      });
    }

    const data = await Products.paginate(querry, options);
    await Products.populate(data.docs, { path: "attributes" });
    for (const id_data of data.docs) {
      if (id_data.attributes) {
        let total_stock = 0;
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
        message: "Không có dữ liệu!",
      });
    }
    return res.status(StatusCodes.OK).json({
      message: "Thành công!",
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server!",
    });
  }
}

export async function get_item_dashboard(req, res) {
  const { _page = 1, _limit = 10, _sort = "" } = req.query;
  try {
    const options = {
      page: _page,
      limit: _limit,
      sort: { createdAt: -1 },
    };
    const data = await Products.paginate({}, options);
    return res.status(StatusCodes.OK).json({
      message: "OK",
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
    const productId = req.params.id;
    const products = await Products.findById(req.params.id).populate(
      "attributes"
    );

    // Kiểm tra tính hợp lệ của ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "ID sản phẩm không hợp lệ" });
    }

    // Sử dụng aggregate để lấy sản phẩm và đánh giá liên quan
    const review = await Products.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(productId) } }, // Tìm sản phẩm bằng productId
      {
        $lookup: {
          from: "reviews", // Tên collection chứa các đánh giá
          localField: "reviews", // Trường trong sản phẩm chứa ID đánh giá
          foreignField: "_id", // Trường trong reviews chứa ID đánh giá
          as: "reviews",
        },
      },
      {
        $lookup: {
          from: "users", // Tên collection chứa người dùng
          localField: "reviews.user", // Trường trong reviews chứa ID người dùng
          foreignField: "_id", // Trường trong users chứa ID người dùng
          as: "reviewUsers",
        },
      },
      {
        $unwind: {
          path: "$reviews",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          "reviews.userDetails": {
            $arrayElemAt: [
              {
                $filter: {
                  input: "$reviewUsers",
                  as: "user",
                  cond: { $eq: ["$$user._id", "$reviews.user"] },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $addFields: {
          // Thêm trường userName vào reviews từ userDetails
          "reviews.userName": {
            $ifNull: ["$reviews.userDetails.userName", "Unknown"],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          reviews: { $push: "$reviews" },
          attributes: { $first: "$attributes" },
          // Thêm các trường khác nếu cần
        },
      },
    ]);

    if (!products) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm" });
    }
    if (products.attributes.values) {
      products.attributes.values = products.attributes.values.map((item) => {
        const new_data = item.size.filter((attr) => attr.stock_attribute > 0);
        return {
          ...item,
          size: new_data,
        };
      });
    }
    await products.save();

    return res.status(StatusCodes.OK).json({
      products,
      review,
    });
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
};

// export const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;
//     const products = await Products.findById(req.params.id).populate(
//       "attributes"
//     );

//     // Kiểm tra tính hợp lệ của ObjectId
//     if (!mongoose.Types.ObjectId.isValid(productId)) {
//       return res
//         .status(StatusCodes.BAD_REQUEST)
//         .json({ message: "ID sản phẩm không hợp lệ" });
//     }

//     // Sử dụng aggregate để lấy sản phẩm và đánh giá liên quan
//     const product = await Products.aggregate([
//       { $match: { _id: new mongoose.Types.ObjectId(productId) } },
//       {
//         $lookup: {
//           from: "reviews", // Tên của collection reviews
//           localField: "reviews",
//           foreignField: "_id",
//           as: "reviews",
//         },
//       },
//       {
//         $lookup: {
//           from: "users", // Tên của collection users
//           localField: "reviews.user",
//           foreignField: "_id",
//           as: "reviewUsers",
//         },
//       },
//       {
//         $unwind: {
//           path: "$reviews",
//           preserveNullAndEmptyArrays: true,
//         },
//       },
//       {
//         $addFields: {
//           "reviews.user": {
//             $arrayElemAt: [
//               {
//                 $filter: {
//                   input: "$reviewUsers",
//                   as: "user",
//                   cond: { $eq: ["$$user._id", "$reviews.user"] },
//                 },
//               },
//               0,
//             ],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           name: { $first: "$name" },
//           description: { $first: "$description" },
//           reviews: { $push: "$reviews" },
//           attributes: { $first: "$attributes" },
//           // Thêm các trường khác nếu cần
//         },
//       },
//     ]);

//     if (!products) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: "Không tìm thấy sản phẩm" });
//     }
//     if (products.attributes.values) {
//       products.attributes.values = products.attributes.values.map((item) => {
//         const new_data = item.size.filter((attr) => attr.stock_attribute > 0);
//         return {
//           ...item,
//           size: new_data,
//         };
//       });
//     }
//     await products.save();

//     return res.status(StatusCodes.OK).json({
//       products,
//       product,
//     });
//   } catch (error) {
//     console.error("Error getting product by ID:", error);
//     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//       message: error.message || "Lỗi server !",
//     });
//   }
// };
export const getDetailProductDashBoard = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id)
      .populate("attributes")
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


export async function filterItems(req, res) {
  const { cate_id, color, name_size, price_ranges, _search } = req.query;
  const { _page = 1, _limit = 20, _sort = "" } = req.query;
  const page = parseInt(_page, 10) || 1;
  const limit = parseInt(_limit, 10) || 20;

  const options = {
    page,
    limit,
    sort: _sort
      ? { [_sort.split(":")[0]]: _sort.split(":")[1] === "desc" ? -1 : 1 }
      : { "attributes.values.size.price_attribute": 1 },
  };

  try {
    const visibleCategories = await Category.find({ published: true }).select(
      "_id"
    );

    if (!visibleCategories || visibleCategories.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Không có Sản Phẩm nào đang được hiển thị!",
      });
    }

    const visibleCategoryIds = visibleCategories.map((cat) =>
      cat._id.toString()
    );

    const query = { category_id: { $in: visibleCategoryIds } };

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
            $lte: parseFloat(range.max),
          },
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

    if (_search) {
      query.$and = [
        {
          name_product: { $regex: new RegExp(_search, "i") },
        },
      ];
    }

    const data = await Products.paginate(query, options);
    await Products.populate(data.docs, { path : 'attributes' })
    const filteredProducts = [];
    for (const id_data of data?.docs) {
      if (id_data.attributes) {
        let total_stock = 0;
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

    if (!data || data.docs.length < 1) {
      return res.status(StatusCodes.OK).json({
        message: "Không tìm thấy sản phẩm phù hợp với tiêu chí",
        data: [],
        pagination: {
          totalItems: 0,
          currentPage: 1,
          totalPages: 0,
          itemsPerPage: limit,
        },
      });
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
          item.price_product = minPrice;
          filteredProducts.push(item);
        }
      } else {
        item.stock_product = item.stock;
        filteredProducts.push(item);
      }
    }

    if (_sort.includes("price_attribute")) {
      filteredProducts.sort((a, b) => {
        const sortOrder = _sort.split(":")[1] === "desc" ? -1 : 1;
        return (a.price_product - b.price_product) * sortOrder;
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Thành công!",
      data: filteredProducts,
      pagination: {
        totalItems: filteredProducts.length,
        currentPage: data.page,
        totalPages: Math.ceil(filteredProducts.length / data.limit),
        itemsPerPage: data.limit,
      },
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
      name_product: { $regex: new RegExp(searchName, "i") },
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
