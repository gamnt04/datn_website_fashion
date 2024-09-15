import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const productSchema = new mongoose.Schema(
  {
    name_product: {
      type: String,
      required: true,
      trim: true,
    },
    // slug: {
    //   type: String,f
    //   unique: true
    // },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price_product: {
      type: Number,
      min: 1,
      // default: 1,
    },
    image_product: {
      type: String,
      required: true,
    },
    gallery_product: {
      type: [String],
    },
    description_product: {
      type: String,
      minlength: 6,
      maxlength: 5000,
    },
    stock_product: {
      type: Number,
      default: 0,
    },
    stock: Number,
    attributes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Attributes",
    },
    featured_product: {
      type: Boolean,
      default: false,
    },
    tag_product: {
      type: [String],
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    averageRating: { type: Number, default: 0 }, // Trường trung bình sao
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

productSchema.statics.filterByAttributePrice = function (
  priceRanges,
  options = {}
) {
  const priceConditions = priceRanges.map(({ minPrice, maxPrice }) => ({
    $match: {
      "attributes_details.values.size.price_attribute": {
        $gte: minPrice,
        $lte: maxPrice,
      },
    },
  }));

  return this.aggregate([
    {
      $lookup: {
        from: "attributes",
        localField: "attributes",
        foreignField: "_id",
        as: "attributes_details",
      },
    },
    {
      $unwind: "$attributes_details",
    },
    {
      $unwind: "$attributes_details.values",
    },
    {
      $unwind: "$attributes_details.values.size",
    },
    ...priceConditions,
    {
      $group: {
        _id: "$_id",
        product: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$product" },
    },
  ])
    .option(options)
    .exec();
};
productSchema.statics.sortByAttributePrice = function (
  sortOrder = 1,
  options = {}
) {
  return this.aggregate([
    {
      $lookup: {
        from: "attributes", // Tên collection của Attributes
        localField: "attributes",
        foreignField: "_id",
        as: "attributes_details",
      },
    },
    {
      $unwind: "$attributes_details",
    },
    {
      $unwind: "$attributes_details.values",
    },
    {
      $unwind: "$attributes_details.values.size",
    },
    {
      $sort: {
        "attributes_details.values.size.price_attribute": sortOrder,
      },
    },
    {
      $group: {
        _id: "$_id",
        product: { $first: "$$ROOT" }, // Giữ lại thông tin sản phẩm đầu tiên trong nhóm sau khi sắp xếp
      },
    },
    {
      $replaceRoot: { newRoot: "$product" },
    },
  ]).exec();
};
productSchema.statics.updateAverageRating = async function (productId) {
  try {
    const result = await this.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(productId) } },
      {
        $lookup: {
          from: "reviews",
          localField: "reviews",
          foreignField: "_id",
          as: "reviewDetails",
        },
      },
      { $unwind: "$reviewDetails" },
      {
        $group: {
          _id: "$_id",
          averageRating: { $avg: "$reviewDetails.rating" },
        },
      },
    ]);

    if (result.length > 0) {
      await this.findByIdAndUpdate(productId, {
        averageRating: result[0].averageRating,
      });
    } else {
      await this.findByIdAndUpdate(productId, { averageRating: 0 }); // Không có đánh giá
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật trung bình sao:", error);
  }
};

export default mongoose.model("Products", productSchema);
