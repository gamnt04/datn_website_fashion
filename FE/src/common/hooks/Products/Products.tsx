import { useQuery } from "@tanstack/react-query";
import {
  get_detail_items,
  get_items_client
} from "../../../_lib/Items/Products";
// import { reduce } from "lodash";

export const Query_Products = (id?: string | number, page?: number) => {
  const key = id ? ["Product_Key", id] : ["Product_Key"];
  const { data, ...rest } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return id ? get_detail_items(id) : get_items_client(page);
    }
  });
  return { data, ...rest };
};
