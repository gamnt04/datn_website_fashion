import { useQuery } from "@tanstack/react-query";
import {
  get_order_client,
  getOneOrderUser,
  getOrderByDayOfWeek,
  getOrderById,
  getOrderByMonthOfYear,
  getOrderOfDay,
  getOrderOfMonth,
  getOrderOfWeek,
  getTop10ProductSale
} from "../../../services/orderProduct";

export function List_One_Order_User(userId: string) {
  const { data, ...rest } = useQuery({
    queryKey: ["Order_key", userId],
    queryFn: async () => {
      return await getOneOrderUser(userId);
    }
  });

  return { data, ...rest };
}
export const Query_Orders = (id?: string, page?: number, status?: string) => {
  const key = id ? ["Order_Key", id] : ["Order_Key"];
  const { data, ...rest } = useQuery({
    queryKey: [...key, page, status],
    queryFn: async () => {
      return id ? getOrderById(id) : get_order_client(page, status);
    }
  });

  return { data: data?.data || data, totalPages: data?.totalPages, ...rest };
};
export const useOrdersOfDay = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["orderOfDay"],
    queryFn: async () => {
      try {
        return await getOrderOfDay();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
export const useOrdersOfWeek = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["orderOfWeek"],
    queryFn: async () => {
      try {
        return await getOrderOfWeek();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
export const useOrdersByDayOfWeek = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["orderByDayOfWeek"],
    queryFn: async () => {
      try {
        return await getOrderByDayOfWeek();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
export const useOrdersOfMonth = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["orderOfMonth"],
    queryFn: async () => {
      try {
        return await getOrderOfMonth();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
export const useOrdersByMonthOfYear = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["orderByMonthOfYear"],
    queryFn: async () => {
      try {
        return await getOrderByMonthOfYear();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
export const useTop10ProductBestSale = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["top10ProductBestSale"],
    queryFn: async () => {
      try {
        return await getTop10ProductSale();
      } catch (error) {
        throw new Error((error as any).message);
      }
    }
  });
  return { data, ...rest };
};
