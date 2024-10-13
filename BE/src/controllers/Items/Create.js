// services/product.ts
import { StatusCodes } from "http-status-codes";
import Category from "../../models/Items/Category.js";
import Products from "../../models/Items/Products.js";
import { validate_items } from "../../validations/items.js";
import { create_variant } from "../Attribute/create_attribute.js";

export const createProduct = async (req, res) => {
  const { category_id } = req.body;
  const dataClient = req.body;

  try {
    if (category_id) {
      const category = await Category.findById(category_id);
      if (!category) {
        return res.status(StatusCodes.NOT_FOUND).json({
          message: "Khong tim thay danh muc !",
        });
      }
    }
    else {
      let check_name_category = await Category.findOne({
        name: "Chưa phân loại",
      });
      if (!check_name_category) {
        check_name_category = await Category.create({
          name: "Chưa phân loại",
        });
      }
    }

    // let slug = slugify(dataClient.name_product, { lower: true });

    // let existingProduct = await Products.findOne({ slug });
    // if (existingProduct) {
    //     slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    // }
    const checkNameItem = await Products.find();
    for (let check of checkNameItem) {
      if (check.name_product == dataClient.name_product) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Tên sản phẩm đã tồn tại!!'
        })
      }
    }
    const newProductData = {
      ...dataClient,
      attributes: null,
      category_id: category_id ? category_id : check_name_category._id,
    };
    const { error } = validate_items.validate(dataClient, {
      abortEarly: false,
    });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    }
    console.log(dataClient.attributes)
    if (dataClient.attributes && dataClient.attributes.length > 0) {
      const convertAttribute = JSON.parse(dataClient.attributes)
      const data = await Products.create(newProductData);
      const variant = await create_variant(convertAttribute)
      await Products.findByIdAndUpdate(data._id, {
        $set: { attributes: variant._id }
      })
      return res.status(StatusCodes.CREATED).json({
        message: 'OK',
        data
      })
    }
    else {
      const data = await Products.create(newProductData);
      return res.status(StatusCodes.CREATED).json({
        message: 'OK',
        data
      })
    }
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: error.message || "Loi server" });
  }
};
