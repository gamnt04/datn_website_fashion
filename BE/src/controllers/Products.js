// services/product.ts
import Products from "../models/Products";
import Category from "../models/Category";
import slugify from "slugify";
import mongoose from "mongoose";
export const createProduct = async (req, res) => {
  try {
    console.log("Receiving product data:", req.body);

    // Validate category_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.body.category_id)) {
      return res.status(400).json({ message: "Invalid category_id format" });
    }

    let slug = slugify(req.body.name, { lower: true });

    let existingProduct = await Products.findOne({ slug });
    if (existingProduct) {
      slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    }

    const newProductData = {
      ...req.body,
      slug,
    };

    const product = await Products.create(newProductData);
    return res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "Không có sản phẩm" });
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error getting all products:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
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

export const updateProductById = async (req, res) => {
  try {
    // Validate if req.params.id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product by ID:", error);
    return res.status(500).json({ error: error.message });
  }
};
