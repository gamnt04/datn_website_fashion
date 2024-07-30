import { useQuery } from "@tanstack/react-query";
import {
  get_detail_items,
  get_items_client,
  get_items_dashboard,
  get_limit_items,
  getDeletedProducts
} from "../../../_lib/Items/Products";
// import { reduce } from "lodash";

export const Query_Products = (id?: string | number, page?: number) => {
  const key = id ? ["Product_Key", id] : ["Product_Key"];
  const { data, ...rest } = useQuery({
    queryKey: key,
    queryFn: async () => {
      return id ? await get_detail_items(id) : await get_items_client(page);
    }
  });
  return { data, ...rest };
};


export function Query_Products_Dashboard (page?: number)  {
  const {data, ...rest} = useQuery({
    queryKey : ["Product_Key"],
    queryFn : () => get_items_dashboard(page)
  });
  return {data, ...rest}
}

export const Query_Limit_Items = ( limit: number) => {
  const { data, ...rest } = useQuery({
    queryKey: ["Product_Key", limit],
    queryFn: async () => await get_limit_items(limit)
  });
  return { data, ...rest };
};

export function Query_Trash_Item () {
  const {data, ...rest} = useQuery({
    queryKey : ['Product_Key'],
    queryFn : () => getDeletedProducts()
  })
  return {data, ...rest}
}
