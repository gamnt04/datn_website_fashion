import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { debounce, reduce } from "lodash";
import { toast } from "react-toastify";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
export const useCart = () => {
  const queryClient = useQueryClient();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:2004/api/v1/carts/${userId}`
      );
      return data;
    }
  });
  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      quantity
    }: {
      productId: string;
      quantity: number;
    }) => {
      const { data } = await axios.post(
        `http://localhost:2004/api/v1/cart/add-to-cart`,
        {
          userId,
          productId,
          quantity
        }
      );
      toast.success("add product successfully !");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      });
    }
  });
  const incrementQuantity = useMutation({
    mutationFn: async (productId) => {
      const { data } = await axios.post(
        `http://localhost:2004/api/v1/cart/increase-product-quantity-in-cart`,
        {
          userId,
          productId
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      });
    }
  });

  const decreaseQuantity = useMutation({
    mutationFn: async (productId) => {
      const { data } = await axios.post(
        `http://localhost:2004/api/v1/cart/decrease-product-quantity-in-cart`,
        {
          userId,
          productId
        }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      });
    }
  });
  const updateQuantity = debounce(
    async (productId: string, quantity: number) => {
      try {
        const { data } = await axios.post(
          `http://localhost:2004/api/v1/cart/update-quantity-products-to-cart`,
          {
            userId,
            productId,
            quantity
          }
        );
        console.log("Update success:", data);
        queryClient.invalidateQueries({
          queryKey: ["cart", userId]
        });
      } catch (error) {
        console.error("Update failed:", error);
      }
    },
    300
  );

  const removeProductInCart = useMutation({
    mutationFn: async (productId) => {
      const confirm = window.confirm("Would you discard this product?");
      if (confirm) {
        const { data } = await axios.post(
          `http://localhost:2004/api/v1/cart/remove-product-to-cart`,
          { userId, productId }
        );
        // toast.success("Success full");
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart", userId]
      });
    }
  });

  const calculateTotal = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total: any, product: any) => total + product.price * product.quantity,
      0
    );
  };

  const calculateTotalProduct = () => {
    if (!data || !data.products) return 0;
    return reduce(
      data.products,
      (total: any, product: any) => total + product.quantity,
      0
    );
  };

  return {
    data,
    isLoading,
    isError,
    incrementQuantity,
    decreaseQuantity,
    removeProductInCart,
    updateQuantity,
    addToCart,
    calculateTotal,
    calculateTotalProduct
  };
};
