import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { AxiosError } from "axios";

interface Product {
  _id: string;
  name: string;
  price_product: number;
}


interface ProductResponse {
  message: string;
  data: {
    docs: Product[];
  };
}


const fetchProducts = async (
  cate_id: string | null,
  minPrice: number | null,
  maxPrice: number | null,
  search: string,
  sort: string,
  page: number = 1,
  limit: number = 20
) => {
  const endpoint = "/products/filter/product";

  const params: { [key: string]: any } = {
    _page: page.toString(),
    _limit: limit.toString(), 
    min_price: minPrice !== null ? minPrice.toString() : undefined,
    max_price: maxPrice !== null ? maxPrice.toString() : undefined,
    _sort: sort || undefined,
    search: search || undefined,
  };

  if (cate_id) {
    params.cate_id = cate_id;
  }

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

export const useProducts = (
  cate_id: string | null,
  minPrice: number | null,
  maxPrice: number | null,
  search: string,
  sort: string,
  page: number = 1,
  limit: number = 20
) => {
  const queryKey = [
    "products",
    cate_id,
    minPrice,
    maxPrice,
    search,
    sort,
    page,
    limit,
  ];

  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchProducts(cate_id, minPrice, maxPrice, search, sort, page, limit),
  });

  return { data, error, isLoading, isError };
};
