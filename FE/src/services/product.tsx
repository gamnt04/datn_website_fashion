import instance from "../configs/axios";
import { IProduct } from "../common/interfaces/Product";
export const getAllProduct = async () => {
  try {
    const { data } = await instance.get(`/products`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id: string) => {
  try {
    const { data } = await instance.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (product: IProduct) => {
  try {
    const { data } = await instance.post("/products", product);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (id: string | number) => {
  try {
    const { data } = await instance.delete(`/products/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (product: IProduct) => {
  try {
    const { data } = await instance.put(`/products/${product.id}`, product);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
