import { reduce } from "lodash";
import instance from "../../configs/axios";

export const list_cart = async (id: string) => {
  try {
    const res = await instance.get(`cart/${id}`);
    return res.data;
  } catch (error) {
    console.error(error || "Loi server!");
  }
};

export const add_cart = async (data: any) => {
  try {
    await instance.post("/cart", data);
  } catch (error) {
    console.log(error || "Loi server !");
  }
};

export const up_quantity = async (data: any) => {
  try {
    await instance.post("/cart/up", data);
  } catch (error) {
    console.log(error || "Loi server !");
  }
};

export const dow_quantity = async (data: any) => {
  try {
    await instance.post("/cart/dow", data);
  } catch (error) {
    console.log(error || "Loi server !");
  }
};

export const remove_quantity = async (data: any) => {
  try {
    await instance.post("/cart/remove", data);
    console.log(data);

  } catch (error) {
    console.log(error || "Loi server !");
  }
};
export const remove_multiple_products = async (data: any) => {
  try {
    await instance.post("/cart/remove-multiple", data);
  } catch (error) {
    console.log(error || "Server error!");
  }
};
export const handle_checked_products = async (data: any) => {
  try {
    await instance.post("/cart/handle_status_cart", data);
  } catch (error) {
    console.log(error || "Server error!");
  }
};