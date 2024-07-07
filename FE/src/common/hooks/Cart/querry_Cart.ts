import { useQuery } from "@tanstack/react-query";
import { list_cart } from "../../../_lib/Cart/Cart";


export function List_Cart(userId: string) {

  const { data, ...rest } = useQuery({
    queryKey: ["Cart_Key", userId],
    queryFn: async () => {
      return await list_cart(userId)
    }
  });

  return { data, ...rest };
}
