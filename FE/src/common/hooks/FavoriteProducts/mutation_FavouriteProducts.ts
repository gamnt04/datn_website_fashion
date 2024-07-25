import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IProduct } from "../../interfaces/Product";
import {
  AddFavouriteProducts,
  RemoveFavouriteProducts
} from "../../../_lib/FavouriteProduct/FavouriteProduct";
type Actions = "ADD" | "REMOVE";
export const Mutation_FavouriteProduct = (actions: Actions) => {
  const queryClient = useQueryClient();
  const { mutate, ...reset } = useMutation({
    mutationFn: async (product: IProduct) => {
      switch (actions) {
        case "ADD":
          return await AddFavouriteProducts(product);
        case "REMOVE":
          return await RemoveFavouriteProducts(product);

        default:
          return;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavouriteProducts_Key"]
      });
    },
    onError: () => {
      console.log("Hãy kiểm tra lại server hoặc internet !");
    }
  });
  return { mutate, ...reset };
};
