import Joi from "joi";

export const validate_items = Joi.object({
  name_product: Joi.string().trim().required().messages({
    "any.required": "Tên là bắt buộc!",
    "string.empty": "Tên không được để khoảng trống!",
  }),
  price_product: Joi.number().min(1).required().messages({
    "any.required": "Giá là bắt buộc!",
    "number.min": "Giá tối thiểu là 1!",
    "number.empty": "Giá không được để khoảng trắng!",
  }),
  image_product: Joi.string().required().messages({
    "any.required": "Ảnh là bắt buộc!",
    "string.empty": "Ảnh không được để khoảng trắng!",
  }),
  gallery_product: Joi.array().required().messages({
    "any.required": "gallery_product là bắt buộc!",
    "string.empty": "gallery_product không được để khoảng trắng!",
    "string.min": "gallery_product tối thiểu là 6 kí tự!",
    "string.max": "gallery_product tối đa 5000 kí tự!",
  }),
  description_product: Joi.string().min(6).max(5000).required().messages({
    "any.required": "Mô tả là bắt buộc!",
    "string.empty": "Mô tả không được để khoảng trắng!",
    "string.min": "Mô tả tối thiểu là 6 kí tự!",
    "string.max": "Mô tả tối đa 5000 kí tự!",
  }),
  quantity_product: Joi.number().min(1).required().messages({
    "any.required": "Số lượng sản phẩm là bắt buộc!",
    "number.min": "Số lượng sản phẩm ít nhất là 1!",
    "number.empty": "Số lượng sản phẩm không được để trống!",
  }),
  countInStock_product: Joi.number().min(1).required().messages({
    "any.required": "Số lượng trong kho là bắt buộc!",
    "number.min": "Số lượng trong kho ít nhất là 1!",
    "number.empty": "Số lượng trong kho không được để khoảng trống!",
  }),
  category_id: Joi.string(),
  featured_product: Joi.boolean(),
  tag_product: Joi.string(),
});
