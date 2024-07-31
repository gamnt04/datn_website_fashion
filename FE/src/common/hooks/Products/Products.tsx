/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import {
  get_detail_items,
  get_items_client,
} from "../../../_lib/Items/Products";
import instance from "../../../configs/axios";
import { format } from "date-fns";

export const Query_Products = (id?: string | number, page?: number) => {
  const key = id ? ["Product_Key", id] : ["Product_Key"];
  const { data, ...rest } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return id ? await get_detail_items(id) : await get_items_client(page);
    },
  });
  return { data, ...rest };
};
export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return format(date, "HH:mm dd/MM/yyyy");
};
