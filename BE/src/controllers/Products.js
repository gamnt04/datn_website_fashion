import Products from "../models/Products";

export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length === 0) {
      return res.status(404).json({ message: "Khong co san pham" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (product.length === 0) {
      return res.status(404).json({ message: "Khong tim thay san pham" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const updateProductById = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
