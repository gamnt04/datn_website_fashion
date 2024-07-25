import { IProduct } from "../../common/interfaces/Product";
import instance from "../../configs/axios";

export const GetAllFavouriteProducts = async (userId: string) => {
  try {
    const { data } = await instance.get(`/favorite/products/${userId}`);
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
export const AddFavouriteProducts = async (product: IProduct) => {
  try {
    const { data } = await instance.post(`/favorite/add-products`, product);
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
export const RemoveFavouriteProducts = async (product: IProduct) => {
  try {
    const { data } = await instance.post(`/favorite/remove-products`, product);
    return data;
  } catch (error) {
    console.log(error || "Loi server !");
  }
};
