/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "../../common/interfaces/Product";
import instance from "../../configs/axios";

const baseUri = "http://localhost:2004/api/v1/products";

export async function get_items_client(page?: number) {
  try {
    let uri = baseUri;
    if (page) {
      uri += `?_page=${page}`;
    }
    const res = await fetch(`${uri}`);

    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data } = await res.json();

    const activeProducts = data.docs.filter(
      (product: any) => !product.deletedAt
    );
    return activeProducts;
  } catch (error) {
    console.log(error || "Loi server!");
    return error
  }
}

export async function get_detail_items(id: number | string) {
  try {
    if (!id) {
      throw new Error("Thiếu tham số ID");
    }

    const res = await fetch(`${baseUri}/${id}`);
    if (!res.ok) {
      console.warn("Server trả về trạng thái không thành công:", res.status);
      throw new Error("Không thể lấy sản phẩm");
    }

    const data = await res.json();
    if (!data) {
      throw new Error("Không có dữ liệu sản phẩm");
    }
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return null;
  }
}

export async function add_items_client(items: any) {
  try {
    const res = await instance.post("/products", items);
    return res
  } catch (error) {
    console.log(error || "Loi server!");
    return error
  }
}

export async function edit_items_client(product: IProduct) {
  try {
    const res = await instance.put(`/products/${product._id}`, product);
    return res;
  } catch (error) {
    console.log(error || "Loi server!");
    throw error;
  }
}

export async function remove_items_client(id: string) {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res;
  } catch (error) {
    console.log(error || "Loi server!");
    return error
  }
}
export const remove_multiple_products = async (data: {
  productIds: string[];
}) => {
  try {
    const response = await instance.post("/products/remove", data);
    return response.data;
  } catch (error) {
    console.log(error || "Loi server!");
    return error
  }
};
export const deleteProduct = async (id: string) => {
  try {
    const res = await instance.delete(`/products/${id}`);
    return res

  } catch (error) {
    console.log("Lỗi rồi đại vương ơi", error);
    return error
  }
};

export const restoreProduct = async (id: string) => {
  try {
    const res = await instance.patch(`/products/${id}`);
    return res;
  } catch (error) {
    console.log("Lỗi rồi đại vương ơi", error);
    return error
  }
};

export async function getDeletedProducts() {
  try {
    const response = await fetch(`${baseUri}/trash`);
    if (!response.ok) {
      throw new Error("Không thể lấy danh sách sản phẩm đã xóa mềm");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm đã xóa mềm:", error);
    throw error;
  }
}
