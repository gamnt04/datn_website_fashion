import Cart from "../models/cart.js";
import Product from "../models/product.js";
import User from "../models/cart";
import { StatusCodes } from "http-status-codes";

export const getCartByIdUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    const dataCart = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name,
        thumbnail: item.productId.thumbnail,
        quantity: item.quantity
      }))
    };
    return res.status(StatusCodes.OK).json({ dataCart });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

export const addProductsToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const existProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (existProductIndex !== -1) {
      cart.products[existProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};
