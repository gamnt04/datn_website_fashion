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
  data: {
    docs: Product[];
  };
}

const fetchFilteredProducts = async (
  cate_id: string | null,
  minPrice: number | null,
  maxPrice: number | null,
  colors: string[],
  sizes: string[]
) => {
  const endpoint = "/products/filter/product";

  const params: { [key: string]: any } = {
    cate_id: cate_id || undefined,
    min_price: minPrice !== null ? minPrice.toString() : undefined,
    max_price: maxPrice !== null ? maxPrice.toString() : undefined,
    colors: colors.length > 0 ? colors.join(",") : undefined,
    sizes: sizes.length > 0 ? sizes.join(",") : undefined,
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
  colors: string[],
  sizes: string[]
) => {
  const queryKey = ["products", cate_id, minPrice, maxPrice, colors, sizes];

  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchFilteredProducts(cate_id, minPrice, maxPrice, colors, sizes),
  });

  return { data, error, isLoading, isError };
};
