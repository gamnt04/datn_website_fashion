import { AxiosError } from "axios";
import instance from "../../../configs/axios";
import { ProductResponse } from "../../../common/interfaces/Product";
import { useQuery } from "@tanstack/react-query";

// Hàm fetch data từ API backend
const fetchFilteredProducts = async (
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20,
  sortOption: string = ""
) => {
  const endpoint = "/products/filter/Product";

  // Xây dựng các tham số cho yêu cầu
  const params: { [key: string]: any } = {
    cate_id: cate_id.length > 0 ? cate_id.join(",") : undefined,
    priceRanges:
      priceRanges.length > 0 ? JSON.stringify(priceRanges) : undefined,
    colors: colors.length > 0 ? colors.join(",") : undefined,
    sizes: sizes.length > 0 ? sizes.join(",") : undefined,
    _page: page,
    _limit: limit,
    _sort: sortOption,
  };

  // Xoá các giá trị undefined khỏi params
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  try {
    // Thực hiện gọi API
    const response = await instance.get<ProductResponse>(endpoint, { params });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const message = error.response?.data.message || "An error occurred";
      throw new Error(message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

// Hook sử dụng React Query để fetch dữ liệu
export const useFilteredProducts = (
  cate_id: string[],
  priceRanges: { min: number; max: number }[],
  colors: string[],
  sizes: string[],
  page: number = 1,
  limit: number = 20,
  sortOption: string = ""
) => {
  // Tạo queryKey để caching
  const queryKey = [
    "products",
    cate_id,
    JSON.stringify(priceRanges),
    colors,
    sizes,
    page,
    limit,
    sortOption,
  ];

  // Sử dụng React Query để gọi API và lưu trữ kết quả
  const { data, error, isLoading, isError } = useQuery<
    ProductResponse,
    AxiosError
  >({
    queryKey,
    queryFn: () =>
      fetchFilteredProducts(
        cate_id,
        priceRanges,
        colors,
        sizes,
        page,
        limit,
        sortOption
      ),
    // Optionally, you can specify `staleTime`, `cacheTime`, etc., based on your needs
  });

  return { data, error, isLoading, isError };
};
