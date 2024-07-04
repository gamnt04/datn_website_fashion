import Products from "../../models/Items/Products";
import {StatusCodes} from 'http-status-codes';
import { validate_items } from "../../validations/items";

export const updateProductById = async (req, res) => {
  const {name_product ,...body} = req.body;
    try {
      const {error} = validate_items.validate(req.body, {abortEarly : false});
      if (error) {
        const message = error.details.map(e => e.message);
        return res.status(StatusCodes.BAD_REQUEST).json({
          message
        })
      }
      const checkEdit = await Products.findOne({...body});
      if (checkEdit) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message : "Khong co gi thay doi !"
        })
      };
      const check_name_item = await Products.findOne({name_product});
      if (check_name_item) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message : "Ten san pham da ton tai"
        })
      }
      const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!product) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy sản phẩm để cập nhật" });
      };
      return res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product by ID:", error);
      return res.status(500).json({ error: error.message });
    }
  };
  