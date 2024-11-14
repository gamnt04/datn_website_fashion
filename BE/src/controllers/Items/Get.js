import { StatusCodes } from "http-status-codes";
import Products from "../../models/Items/Products";
import Attribute from "../../models/attribute/variant";
import Category from "../../models/Items/Category";
import ThuocTinh from "../../models/attribute/thuoc_tinh";
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
    // console.log(data.docs);

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
    await Products.populate(data.docs, { path: "category_id" });
    await Products.populate(data.docs, { path: "attributes" });
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
    const products = await Products.findById(req.params.id);

    if (products?.attributes) {
      await Products?.populate(products, { path: "attributes" });
      if (products.attributes.values) {
        products.attributes.values = products.attributes.values.map((item) => {
          const new_data = item.size.filter((attr) => attr.stock_attribute > 0);
          if (new_data.length > 0) {
            return {
              ...item,
              size: new_data,
            };
          }
        });
        products.attributes.values = products.attributes.values.filter(
          (item) => item !== undefined
        );
      }
      await products.save();
    }

    // Kiểm tra tính hợp lệ của ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "ID sản phẩm không hợp lệ" });
    }

    // Sử dụng aggregate để lấy sản phẩm và đánh giá liên quan, cùng thông tin user
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
        $unwind: "$reviews", // Tách từng review ra để thao tác
      },
      {
        $lookup: {
          from: "users", // Tên collection chứa người dùng
          localField: "reviews.userId", // Trường trong reviews chứa ID người dùng
          foreignField: "_id", // Trường trong users chứa ID người dùng
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails", // Tách thông tin người dùng ra
      },
      {
        $addFields: {
          "reviews.userName": "$userDetails.userName", // Thêm userName từ userDetails vào reviews
        },
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          description: { $first: "$description" },
          reviews: { $push: "$reviews" }, // Gom các reviews lại
          attributes: { $first: "$attributes" },
        },
      },
    ]);

    if (!products) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Không tìm thấy sản phẩm" });
    }

    return res.status(StatusCodes.OK).json({
      products,
      review,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Lỗi server !",
    });
  }
};

export const getProductAverageRating = async (req, res) => {
  const productId = req.params.id;
  try {
    // Cập nhật trung bình sao trước tiên
    await Products.updateAverageRating(productId);

    // Sau khi cập nhật, truy vấn lại sản phẩm để lấy giá trị mới
    const product = await Products.findById(productId).select("averageRating");

    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }

    // Trả về trung bình sao hiện tại của sản phẩm
    return res.status(200).json({
      averageRating: product.averageRating,
      message: `Trung bình sao hiện tại của sản phẩm là: ${product.averageRating}`,
    });
  } catch (error) {
    console.error("Lỗi khi lấy trung bình sao của sản phẩm:", error);
    return res.status(500).json({
      message: "Lỗi khi tính toán trung bình sao",
      error: error.message,
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

export async function filterItems(req, res) {
  const { colors, sizes } = req.query; // Lấy màu sắc và kích thước từ query parameters

  const colorArray = colors ? colors.split(",") : []; // Tách mảng màu sắc
  const sizeArray = sizes ? sizes.split(",") : []; // Tách mảng kích thước

  console.log("Color Array:", colorArray);
  console.log("Size Array:", sizeArray);

  // Xây dựng query cho ThuocTinh (màu sắc theo symbol_thuoc_tinh)
  const queryThuocTinh = colorArray.length
    ? { symbol_thuoc_tinh: { $in: colorArray } }
    : {}; // Nếu không có màu sắc, không lọc theo màu sắc trong ThuocTinh

  // Xây dựng query cho Attributes (màu sắc trong 'values.color' và kích thước)
  const queryAttributes = colorArray.length
    ? {
        "values.color": { $in: colorArray }, // Kiểm tra tên màu trong `values.color`
      }
    : {}; // Nếu không có màu sắc, không lọc theo màu sắc trong Attributes

  try {
    // Truy vấn dữ liệu từ collection ThuocTinh
    const thuocTinhResults = colorArray.length
      ? await ThuocTinh.find(queryThuocTinh) // Lọc màu sắc trong ThuocTinh nếu có
      : [];
    console.log("ThuocTinh Results: ", thuocTinhResults);

    // Truy vấn dữ liệu từ collection Attributes
    const attributeResults = colorArray.length
      ? await Attribute.find(queryAttributes) // Lọc màu sắc trong Attributes nếu có
      : [];
    console.log("Attribute Results: ", attributeResults);

    // Xây dựng điều kiện lọc sản phẩm từ màu sắc trong `ThuocTinh` và `Attributes`
    let productQuery = {};

    // Kiểm tra màu sắc theo `symbol_attribute` từ ThuocTinh
    if (colorArray.length) {
      const thuocTinhColors = thuocTinhResults.map(
        (item) => item.symbol_thuoc_tinh
      );
      productQuery["values.color"] = { $in: thuocTinhColors }; // Lọc sản phẩm có màu sắc trùng với symbol_thuoc_tinh
    }

    // Nếu có màu sắc từ Attributes, tìm các sản phẩm có màu trong trường values.color
    if (colorArray.length) {
      productQuery["values.color"] = { $in: colorArray }; // Lọc theo `values.color` trong sản phẩm
    }

    console.log("Product Query:", productQuery);

    // Truy vấn sản phẩm từ collection Products theo các điều kiện lọc
    const products = await Products.find(productQuery);
    console.log("Filtered Products:", products);

    // Nếu không có sản phẩm nào, trả về thông báo không tìm thấy
    if (products.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm phù hợp.",
        data: [],
        pagination: {
          totalItems: 0,
          currentPage: 1,
          itemsPerPage: 20,
        },
      });
    }

    // Trả về kết quả
    return res.status(200).json({
      message: "Thành công!",
      data: products,
      pagination: {
        totalItems: products.length,
        currentPage: 1,
        itemsPerPage: 20,
      },
    });
  } catch (err) {
    console.error("Error filtering products:", err);
    return res.status(500).json({ message: "Lỗi server!" });
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
