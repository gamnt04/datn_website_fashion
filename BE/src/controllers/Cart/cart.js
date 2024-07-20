import Cart from "../../models/Cart/cart";
import { StatusCodes } from "http-status-codes";

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }
    const dataCart = {
      products: cart.products.map((item) => ({
        productId: item.productId._id,
        name: item.productId.name_product,
        image: item.productId.image_product,
        price: item.productId.price_product,
        thumbnail: item.productId.thumbnail,
        quantity: item.quantity
      }))
    };
    return res.status(StatusCodes.OK).json(dataCart);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
export const removeProductToCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart Not Found" });
    }
    cart.products = cart.products.filter(
      (product) =>
        product.productId && product.productId.toString() !== productId
    );
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};
export const removeMultipleProductsFormCart = async (req, res) => {
  try {
    const { userId, productIds } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart Not Found" });
    }
    cart.products = cart.products.filter(
      (product) => !productIds.includes(product.productId.toString())
    );
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};
