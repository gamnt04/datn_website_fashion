import { IProduct } from "../../common/interfaces/Product";
import instance from "../../configs/axios";

export const GetAllFavouriteProducts = async (userId: string) => {
  try {
    const { data } = await instance.get(`/favorite/products/${userId}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
export const AddFavouriteProducts = async (
  userId: string,
  productId: string
) => {
  try {
    const { data } = await instance.post(`/favorite/add-products`, {
      userId,
      productId
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
export const RemoveFavouriteProducts = async (
  userId: string,
  productId: string
) => {
  try {
    const { data } = await instance.post(`/favorite/remove-product`, {
      userId,
      productId
    });
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
