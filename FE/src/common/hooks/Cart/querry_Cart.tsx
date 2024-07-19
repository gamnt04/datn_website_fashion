import { useQuery } from "@tanstack/react-query";
import { list_cart } from "../../../_lib/Cart/Cart";
import { reduce } from "lodash";

export const List_Cart = (userId: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["Cart_Key", userId],
    queryFn: async () => {
      return await list_cart(userId);
    }
  });

  const calculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, product) => total + product.price_product * product.quantity_product, 0
    );
  };

  const calculateTotalProduct = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total, product) => total + product.quantity,
      0
    );
  };

  return { data, calculateTotal, calculateTotalProduct, ...rest };
};
