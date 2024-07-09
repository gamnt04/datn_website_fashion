/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useLocalStorage from "../Storage/useStorage";
import axios from "axios";
import { toast } from "react-toastify";

export const useFavoriteProducts = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["favoriteProducts", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:2004/api/v1/favorite/products/${userId}`
      );
      return data;
    }
  });
  const addFavoriteProduct = useMutation({
    mutationFn: async ({ productId }: { productId: string }) => {
      const { data } = await axios.post(
        `http://localhost:2004/api/v1/favorite/add-products`,
        {
          userId,
          productId
        }
      );
      toast.success("add product successfully !");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteProducts", userId]
      });
    }
  });
  const removeFavoriteProduct = useMutation({
    mutationFn: async (productId) => {
      const confirm = window.confirm("Would you discard this product?");
      if (confirm) {
        const { data } = await axios.post(
          `http://localhost:2004/api/v1/favorite/remove-product`,
          {
            userId,
            productId
          }
        );
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["favoriteProducts", userId]
      });
    }
  });
  return {
    data,
    isLoading,
    isError,
    removeFavoriteProduct,
    addFavoriteProduct
  };
};
