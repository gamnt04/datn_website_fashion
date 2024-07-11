/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from "../../common/interfaces/Product";

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
    const res = await fetch(`${baseUri}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    });
    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data } = await res.json();
    return data.docs;
  } catch (error) {
    console.log(error || "Loi server!");
  }
}

export async function edit_items_client(id: string, product: IProduct) {
  try {
    const res = await fetch(`${baseUri}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
      throw new Error("Request failed with status " + res.status);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error || "Loi server!");
    throw error;
  }
}

export async function remove_items_client(id: string) {
  try {
    const res = await fetch(`${baseUri}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      console.warn("Kiem tra lai server hoac internet !");
    }
    const { data } = await res.json();
    return data.docs;
  } catch (error) {
    console.log(error || "Loi server!");
  }
}

export const deleteProduct = async (id: string) => {
  const response = await fetch(
    `http://localhost:2004/api/v1/products/permanent/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
};

export const restoreProduct = async (id: string) => {
  const response = await fetch(`http://localhost:2004/api/v1/products/${id}`, {
    method: "PATCH",
  });
  return response.json();
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
