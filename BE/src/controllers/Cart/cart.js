import Cart from "../../models/Cart/cart";
import { StatusCodes } from "http-status-codes";

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const dataCart = await Cart.findOne({ userId }).populate("products.productId");
    if (!dataCart) {
      return res
        .status(StatusCodes.OK)
        .json([]);
    }
    dataCart.total_price = dataCart.products.reduce((a, b) => {
      if (b.status_checked) {
        return a + b.total_price_item
      }
      else {
        return a
      }
    }, 0);
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
    const { userId } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: "Cart Not Found" });
    }
    cart.products = cart.products.filter(
      (product) => !product.status_checked);
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export async function handle_status_checked(req, res) {
  const { userId, productId, color, size } = req.body;
  try {
    const data_cart = await Cart.findOne({ userId });
    for (let i of data_cart.products) {
      if (i.productId.toString() == productId._id.toString()) {
        if (color && size) {
          if (i.color_item == color && i.name_size == size){
            i.status_checked = !i.status_checked;
          }
        }
        else if (color) {
          if (i.color_item == color){
            i.status_checked = !i.status_checked;
          }
        }
        else if (size) {
          if (i.name_size == size){
            i.status_checked = !i.status_checked;
          }
        }
      }
    };
    await data_cart.save();
    return res.status(StatusCodes.OK).json({
      message: 'Done!',
      data_cart
    })
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || 'Loi roi dai vuong oi!'
    })
  }
}