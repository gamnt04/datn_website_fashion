import instance from "../configs/axios";
export const GetAllOrder = async () => {
  try {
    const { data } = await instance.get(`orders`);
const baseUri = 'http://localhost:2004/api/v1/orders';

// export const GetAllOrder = async (page: number, status: string = "") => {
//   try {
//     const { data } = await instance.get(`/orders?page=${page}&status=${status}`);
//     console.log(data);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
export async function get_order_client(page?: number, status?: string) {
  try {
    let uri = baseUri;
    const params = [];
    if (page) {
      params.push(`_page=${page}`);
    }
    if (status) {
      params.push(`_status=${status}`);
    }

    if (params.length > 0) {
      uri += `?${params.join('&')}`;
    }
    const res = await fetch(uri);
    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data, totalDocs, totalPages } = await res.json();
    return { data: data.docs, totalDocs, totalPages };
  } catch (error) {
    console.log(error || "Loi server!")
  }
<<<<<<< HEAD
};
// export const GetAllOrder = async (page: number, status: string = "") => {
//   try {
//     const { data } = await instance.get(`/orders?page=${page}&status=${status}`);

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
=======
}
>>>>>>> 12a7e5c95e15205ca155a1a3a5ecb50c719b4458
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
