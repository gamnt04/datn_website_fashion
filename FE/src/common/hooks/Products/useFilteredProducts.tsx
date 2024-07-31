import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../../interfaces/Product";
import instance from "../../../configs/axios";

interface FilteredProductsResponse {
  message: string;
  data: {
    docs: IProduct[];
  };
}

// Hàm gọi API
const fetchFilteredProducts = async (
  categoryId: string | null,
  page: number = 1,
  sort: string = "",
  limit: number = 20,
  search: string = ""
) => {
  const endpoint = categoryId
    ? `/products/category/${categoryId}`
    : "/products";

  const response = await instance.get<FilteredProductsResponse>(endpoint, {
    params: {
      _page: page,
      _sort: sort,
      _limit: limit,
      _search: search,
    },
  });

  return response.data;
};

// Tạo hook useFilteredProducts
export const useFilteredProducts = (
  categoryId: string | null,
  page: number = 1,
  sort: string = "",
  limit: number = 20,
  search: string = ""
) => {
  const queryKey = ["filteredProducts", categoryId, page, sort, limit, search];

  const { data, error, isLoading, isError } = useQuery({
    queryKey,
    queryFn: () => fetchFilteredProducts(categoryId, page, sort, limit, search),
  });

  return { data, error, isLoading, isError };
};
