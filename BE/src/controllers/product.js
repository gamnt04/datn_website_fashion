import Product from "../models/product";
export const create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(500).json({ message: "Không có sản phẩm nào " });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const deleteById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
export const updateById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
