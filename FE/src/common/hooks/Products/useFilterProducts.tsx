import { AxiosError } from "axios";
import instance from "../../../configs/axios";
import { ProductResponse } from "../../../common/interfaces/Product";
import { useQuery } from "@tanstack/react-query";

// Hàm fetch data từ API backend
const fetchFilteredProducts = async (
  query: string,
  cate_id: string[], // Các danh mục cần lọc
  price_ranges: { min: number; max: number }[], // Dải giá cần lọc
  color: string[], // Màu sắc cần lọc
  name_size: string[], // Kích thước cần lọc
  page: number = 1, // Trang
  limit: number = 20, // Số lượng sản phẩm mỗi trang
  sortOption: string = "" // Cách thức sắp xếp
) => {
  const endpoint = "/products/filter/Product"; // Đường dẫn đến API

  // Xây dựng các tham số cho yêu cầu
  const params: { [key: string]: any } = {
    _search: query || undefined,
    cate_id: cate_id.length > 0 ? cate_id.join(",") : undefined,
    price_ranges:
      price_ranges.length > 0 ? JSON.stringify(price_ranges) : undefined,
    color: color.length > 0 ? color.join(",") : undefined, // Dùng color để lọc
    name_size: name_size.length > 0 ? name_size.join(",") : undefined,
    _page: page,
    _limit: limit,
    _sort: sortOption,
  };

  // Xóa các giá trị undefined khỏi params
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  try {
    // Thực hiện gọi API với tham số `params`
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

export const useFilteredProducts = (
  query: string,
  cate_id: string[], // Các danh mục lọc
  price_ranges: { min: number; max: number }[], // Dải giá lọc
  color: string[], // Màu sắc lọc
  name_size: string[], // Kích thước lọc
  page: number = 1, // Trang
  limit: number = 20, // Số sản phẩm trên mỗi trang
  sortOption: string = "" // Sắp xếp
) => {
  // Tạo queryKey để caching
  const queryKey = [
    "products",
    query,
    cate_id,
    JSON.stringify(price_ranges),
    color, // Lọc theo màu sắc
    name_size,
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
        query,
        cate_id,
        price_ranges,
        color, // Truyền color thay vì _search
        name_size,
        page,
        limit,
        sortOption
      ),
  });

  return { data, error, isLoading, isError };
};
