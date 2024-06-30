import { StatusCodes } from "http-status-codes";
import FavoriteProducts from "../models/favoriteProducts";
export const GetFavoriteProductById = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data } = await FavoriteProducts.findOne({ userId }).populate(
      "products.productId"
    );
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};
