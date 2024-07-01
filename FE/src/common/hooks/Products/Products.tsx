import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export const useProduct = () => {
  const queryClient = useQueryClient();
  const { productId } = useParams<{ productId: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:2004/api/v1/products/${productId}`
      );
      return data;
    }
  });
  return {
    data,
    isError,
    isLoading
  };
};
