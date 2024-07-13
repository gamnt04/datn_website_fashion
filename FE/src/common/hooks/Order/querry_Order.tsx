import { useQuery } from "@tanstack/react-query";
import {
  get_order_client,
  getOneOrderUser,
  getOrderById
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
  const key = id ? ["Orders_Key", id] : ["Orders_Key"];

  const { data, ...rest } = useQuery({
    queryKey: [...key, page, status],
    queryFn: async () => {
      return id ? getOrderById(id) : get_order_client(page, status);
    }
  });
  console.log(data);

  return { data: data?.data || data, totalPages: data?.totalPages, ...rest };
};
