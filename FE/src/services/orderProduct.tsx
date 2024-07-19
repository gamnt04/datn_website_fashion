import instance from "../configs/axios";

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
  try {
    const { data } = await instance.post(`/orders/get_order_user`, { userId });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const Add_Order = async (order: any) => {
  try {
    const { data } = await instance.post(`/orders`, order);
    // console.log(data);
    return data;
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

