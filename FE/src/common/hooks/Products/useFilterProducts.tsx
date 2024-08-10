import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { AxiosError } from "axios";

interface Product {
  _id: string;
  name_product: string;
  price_product: number;
  // Add other properties if needed
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
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20
) => {
  const endpoint = "/products/filter/product";

  const params: { [key: string]: any } = {
    cate_id: cate_id.length > 0 ? cate_id.join(",") : undefined,
    price_ranges:
      priceRanges.length > 0 ? JSON.stringify(priceRanges) : undefined,
    color: colors.length > 0 ? colors.join(",") : undefined,
    name_size: sizes.length > 0 ? sizes.join(",") : undefined,
    _page: page,
    _limit: limit,
  };

  try {
    const response = await instance.get<ProductResponse>(endpoint, { params });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message || "An error occurred";
      const status = error.response?.status?.toString() || "500";
      throw new AxiosError(message, status);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const useFilteredProducts = (
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20
) => {
  const queryKey = [
    "products",
    cate_id,
    priceRanges,
    colors,
    sizes,
    page,
    limit,
  ];

  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchFilteredProducts(cate_id, priceRanges, colors, sizes, page, limit),
  });

  return { data, error, isLoading, isError };
};
