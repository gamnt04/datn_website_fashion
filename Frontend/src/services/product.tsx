import instance from "../configs/axios";

export const GetAllProducts = async () => {
  try {
    const { data } = await instance.get(`/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
