import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { AxiosError } from "axios";

interface Product {
  _id: string;
  name_product: string;
  price_product: number;
  stock_product?: number;
}

interface ProductResponse {
  message: string;
  data: Product[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
  };
}

const fetchFilteredProducts = async (
  query: string,
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20,
  sortOption: string = ""
) => {
  const endpoint = "/products/filter/product"; // Điều chỉnh endpoint nếu cần thiết

  const params: { [key: string]: any } = {
    _search: query,
    cate_id: cate_id.length > 0 ? cate_id.join(",") : undefined,
    price_ranges:
      priceRanges.length > 0 ? JSON.stringify(priceRanges) : undefined,
    color: colors.length > 0 ? colors.join(",") : undefined,
    name_size: sizes.length > 0 ? sizes.join(",") : undefined,
    _page: page,
    _limit: limit,
    _sort: sortOption,
  };

  try {
    const response = await instance.get<ProductResponse>(endpoint, { params });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message || "An error occurred";
      throw new AxiosError(message, error.code, error.request, error.response);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const useFilteredProducts = (
  query: string,
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20,
  sortOption: string = ""
) => {
  const queryKey = [
    "products",
    query,
    cate_id,
    priceRanges,
    colors,
    sizes,
    page,
    limit,
    sortOption,
  ];

  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchFilteredProducts(
        query,
        cate_id,
        priceRanges,
        colors,
        sizes,
        page,
        limit,
        sortOption
      ),
  });

  return { data, error, isLoading, isError };
};
