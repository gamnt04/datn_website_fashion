import category from "../models/Category.js";
import { categoryValidator } from "../validations/category.js";

export const create = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body, {
      abortEarly: false
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors
      });
    }
    const data = await category(req.body).save();
    if (!data) {
      throw new Error(`Error creating`);
    }
    return res.status(200).json({
      message: "Success",
      data
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message
    });
  }
};

export const get = async (req, res) => {
  try {
    const data = await category.find();
    if (!data) {
      throw new Error(`Failed to get categories`);
    }
    return res.status(200).json({
      message: "Success",
      data
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message
    });
  }
};
export const getById = async (req, res) => {
  try {
    const data = await category.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get category detail`);
    }
    return res.status(200).json({
      message: "Success",
      data
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message
    });
  }
};
export const update = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body, {
      abortEarly: false,
      allowUnknown: true
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors
      });
    }
    const data = await category.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!data) {
      throw new Error(`Failed to update category`);
    }
    return res.status(200).json({
      data
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await category.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      throw new Error(`Failed to delete category`);
    }
    return res.status(200).json({
      message: "Remove success",
      data
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message
    });
  }
};
export const Statistical = async (req, res) => {
  try {
    const categorys = await category.distinct("category");
    const categoryCount = categorys.length;
    return res.status(200).json({ count: categoryCount });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
