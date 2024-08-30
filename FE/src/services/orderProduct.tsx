import { toast } from "react-toastify";
import instance from "../configs/axios";

const baseUri = "http://localhost:2004/api/v1/orders";

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
      uri += `?${params.join("&")}`;
    }
    const res = await fetch(uri);
    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data, totalDocs, totalPages } = await res.json();
    return { data: data.docs, totalDocs, totalPages };
  } catch (error) {
    console.log(error || "Loi server!");
  }
}
export const getOrderById = async (id: string) => {
  try {
    const { data } = await instance.get(`/orders/${id}`);
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOneOrderUser = async (userId: string) => {
  console.log(userId);

  try {
    const { data } = await instance.get(`/orders/get_order_user/${userId}`);

    return data?.docs;
  } catch (error) {
    console.log(error);
  }
};

export const Add_Order = async (order: any) => {
  try {
    const data = await instance.post(`/orders`, order);
    if (data?.status === 201) {
      sessionStorage.removeItem("item_order");
      toast.success("Đặt hàng thành công", { autoClose: 500 });
    } else {
      toast.error("Đặt hàng không thành công", { autoClose: 500 });
    }
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const Update_Status = async (items: any) => {
  console.log(items);
  try {
    const { data } = await instance.patch(`orders/${items.id}`, items.status);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// lấy các đơn hàng trong ngày
export const getOrderOfDay = async () => {
  try {
    const { data } = await instance.get(`/orders/all_order_of_to_day`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// lấy các đơn hàng trong tuần
export const getOrderOfWeek = async () => {
  try {
    const { data } = await instance.get(`/orders/all_order_week`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// lấy các đơn hàng theo các thứ trong tuần
export const getOrderByDayOfWeek = async () => {
  try {
    const { data } = await instance.get(`/orders/all_order_by_day_of_week`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
// lấy các đơn hàng trong tháng
export const getOrderOfMonth = async () => {
  try {
    const { data } = await instance.get(`/orders/all_order_month`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOrderByMonthOfYear = async () => {
  try {
    const { data } = await instance.get(`/orders/all_order_by_month_of_year`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getTop10ProductSale = async () => {
  try {
    const { data } = await instance.get(`/orders/top_10_products_best_sale`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// huy don hang có yêu cầu xác nhận

export const Cancel_Order = async (id: any, cancellationReason: any) => {
  try {
    const { data } = await instance.post(`/orders/${id}/cancel`, { cancellationReason });
    const message = 'yeu_cau_huy';
    const res = {
      data,
      message
    }
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const confirmCancelOrder = async ({ id_item, confirm }: any) => {
  try {
    const { data } = await instance.post(`/orders/${id_item}/cancel/confirm`, {
      confirm
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const cancel_product = async (id: any,) => {
  try {
    const { data } = await instance.patch(`/orders/${id}`, { status: "5" })
    const message = 'huy';
    const res = {
      data,
      message
    }
    console.log(data);

    return res;
  } catch (error) {
    console.log(error);
  }
};


export const complete_product = async (id: any) => {
  console.log(id);

  try {
    const { data } = await instance.patch(`/orders/${id}`, { status: "4" })
    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const updateOrderStatus = async (id: any, currentStatus: string) => {
//   const statusOrder: any = {
//     "1": "2",
//     "2": "3",
//     "3": "4",
//   };
//   if (currentStatus === "5") {
//     return;
//   }
//   const nextStatus = statusOrder[currentStatus] || "4";

//   try {
//     const { data } = await instance.patch(`/orders/${id}`, { status: nextStatus });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };