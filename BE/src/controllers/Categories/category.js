import Category from "../../models/Items/Category.js";
import { categoryValidator } from "../../validations/category.js";

export const create_category = async (req, res) => {
  try {
    const { error } = categoryValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }
    const data = await Category(req.body).save();
    if (!data) {
      throw new Error(`Error creating`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};

export const get_category = async (req, res) => {
  try {
    const keyword = req.query.keyword;
    let objWhere = {};
    if (keyword) {
      objWhere.name = new RegExp(keyword, "i");
    }

    const data = await Category.find(objWhere);
    if (!data) {
      throw new Error(`Failed to get categories`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      name: error.name,
      message: error.message,
    });
  }
};
export const getById_category = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);
    if (!data) {
      throw new Error(`Failed to get category detail`);
    }
    return res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
// export const update = async (req, res) => {
//   try {
//     const { error } = categoryValidator.validate(req.body, {
//       abortEarly: false,
//       allowUnknown: true,
//     });
//     if (error) {
//       const errors = error.details.map((err) => err.message);
//       return res.status(400).json({
//         message: errors,
//       });
//     }
//     const data = await category.findByIdAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (!data) {
//       throw new Error(`Failed to update category`);
//     }
//     return res.status(200).json({
//       data,
//     });
//   } catch (error) {
//     return res.json({
//       name: error.name,
//       message: error.message,
//     });
//   }
// };

export const remove_category = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete({ _id: req.params.id });
    if (!data) {
      throw new Error(`Failed to delete category`);
    }
    return res.status(200).json({
      message: "Remove success",
      data,
    });
  } catch (error) {
    return res.json({
      name: error.name,
      message: error.message,
    });
  }
};
export const statistical_category = async (req, res) => {
  try {
    const categorys = await Category.distinct("category");
    const categoryCount = categorys.length;
    return res.status(200).json({ count: categoryCount });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
