import Products from "../../models/Items/Products";
import { StatusCodes } from "http-status-codes";
import Variant from "../../models/attribute/variant";
import { validate_items } from "../../validations/items";
import { create_variant } from "../attribute/create";

export const updateProductById = async (req, res) => {
  const { name_product, ...body } = req.body;
  try {
    const { error } = validate_items.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((e) => e.message);
      return res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    }
    let convertAttribute;
    if (req.body.attributes) {
      convertAttribute = JSON.parse(req.body.attributes);
    }
    if (convertAttribute) {
      await Variant.findOneAndDelete({ _id: req.body.attributes._id });
      if (!Array.isArray(convertAttribute)) {
        convertAttribute = Object.keys(convertAttribute)
          .filter(key => !['_id', 'id_item', 'varriants', 'createdAt', 'updatedAt'].includes(key))
          .map(key => convertAttribute[key])
      }
      const variant = await create_variant(convertAttribute);
      const dataClient = {
        ...req.body,
        attributes: null
      }
      const product = await Products.findByIdAndUpdate(req.params.id, {
        $set: {
          ...dataClient,
          attributes: variant._id
        }
      }, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
      }
      return res.status(200).json(product);
    } else {
      const dataClient = {
        ...req.body,
        attributes: convertAttribute,
      }
      const product = await Products.findByIdAndUpdate(req.params.id, dataClient, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
      }
      return res.status(200).json(product);
    }
  } catch (error) {
    console.error("Error updating product by ID:", error);
    return res.status(500).json({ error: error.message });
  }
};
