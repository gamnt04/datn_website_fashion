import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { AxiosError } from "axios";

interface Product {
  _id: string;
  name_product: string;
  price_product: number;
  // Thêm các thuộc tính khác nếu cần
}

interface ProductResponse {
  message: string;
  data: Product[];
}

const fetchFilteredProducts = async (
  cate_id: string | null,
  minPrice: number | null,
  maxPrice: number | null,
  color: string[],
  name_size: string[]
) => {
  const endpoint = "/products/filter/product";

  // Chuyển mảng màu sắc và kích thước thành chuỗi
  const params: { [key: string]: any } = {
    cate_id: cate_id || undefined,
    min_price: minPrice !== null ? minPrice.toString() : undefined,
    max_price: maxPrice !== null ? maxPrice.toString() : undefined,
    color: color.length > 0 ? color.join(",") : undefined,
    name_size: name_size.length > 0 ? name_size.join(",") : undefined,
  };

  try {
    const response = await instance.get<ProductResponse>(endpoint, { params });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message || "Đã xảy ra lỗi";
      const status = error.response?.status?.toString() || "500";
      throw new AxiosError(message, status);
    } else {
      throw new Error("Đã xảy ra lỗi không xác định");
    }
  }
};

// Export named
export const useFilteredProducts = (
  cate_id: string | null,
  minPrice: number | null,
  maxPrice: number | null,
  color: string[],
  name_size: string[]
) => {
  const queryKey = [
    "products",
    cate_id,
    minPrice,
    maxPrice,
    color,
    name_size,
  ];

  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchFilteredProducts(cate_id, minPrice, maxPrice, color, name_size),
  });

  return { data, error, isLoading, isError };
};
