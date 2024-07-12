// services/product.ts
import { StatusCodes } from "http-status-codes";
import Category from "../../models/Items/Category";
import Products from "../../models/Items/Products";
import { validate_items } from "../../validations/items";

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
    let check_name_category = await Category.findOne({
      name: "Chưa phân loại",
    });
    if (!check_name_category) {
      check_name_category = await Category.create({
        name: "Chưa phân loại",
      });
    }
    // let slug = slugify(dataClient.name_product, { lower: true });

    // let existingProduct = await Products.findOne({ slug });
    // if (existingProduct) {
    //     slug = `${slug}-${Math.floor(Math.random() * 10000)}`;
    // }
    const newProductData = {
      ...dataClient,
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

    const data = await Products.create(newProductData);
    await Category.findByIdAndUpdate(
      category_id ? category_id : check_name_category._id,
      {
        $addToSet: {
          products: data._id,
        },
      }
    );
    return res.status(201).json({
      message: "Done !",
      data,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: error.message || "Loi server" });
  }
};
