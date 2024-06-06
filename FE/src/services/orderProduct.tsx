import instance from "../configs/axios";

export const GetAllOrder = async () => {
  try {
    const { data } = await instance.get(`/orders`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
