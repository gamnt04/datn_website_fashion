import instance from "../configs/axios";

export const GetAllOrder = async (page: number, status: string = "") => {
  try {
    const { data } = await instance.get(`/orders?page=${page}&status=${status}`);
    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrderById = async (id: string) => {
  try {
    const { data } = await instance.get(`/orders/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOneOrderUser = async (userId: string) => {
  try {
    const { data } = await instance.post(`/orders/get_order_user`, { userId });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const Add_Order = async (order: any) => {
  try {
    const { data } = await instance.post(`/orders`, order);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const Update_Status = async (id: string, status: string) => {
//   try {
//     const { data } = await instance.patch(`/orders/${id}`, { status });
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };


// router.post("/orders", createOrder);
// router.get("/orders", getOrders);
// router.post("/orders/get_order_user", getOneOrderUser);
// router.get("/orders/:id", getOrderById);
// router.patch("/orders/:id", updateOrderStatus);
