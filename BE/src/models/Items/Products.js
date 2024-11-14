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
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price_product: {
      type: Number,
      min: 1,
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
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

productSchema.statics.filterByColor = function (colors, options = {}) {
  const colorConditions = colors.map((color) => ({
    $match: {
      "attributes_details.values.color": color, // Điều kiện lọc theo màu sắc
    },
  }));

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
    ...colorConditions,
    {
      $group: {
        _id: "$_id",
        product: { $first: "$$ROOT" }, // Giữ lại sản phẩm đầu tiên trong nhóm
      },
    },
    {
      $replaceRoot: { newRoot: "$product" },
    },
  ])
    .option(options)
    .exec();
};

// Hàm lọc sản phẩm theo giá trong attributes
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

// Hàm sắp xếp sản phẩm theo giá trong attributes
productSchema.statics.sortByAttributePrice = function (
  sortOrder = 1,
  options = {}
) {
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
    {
      $sort: {
        "attributes_details.values.size.price_attribute": sortOrder,
      },
    },
    {
      $group: {
        _id: "$_id",
        product: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$product" },
    },
  ]).exec();
};

export default mongoose.model("Products", productSchema);
