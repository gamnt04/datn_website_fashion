import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { createCategories, remove, update } from "../../../services/category";
import { ApiResponse, ICategory } from "../../interfaces/Category";
import { CategoryJoiSchema } from "../../validations/category";

type useCategoryMutationProps = {
  action: "CREATE" | "DELETE" | "UPDATE";
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

const useCategoryMutation = ({
  action,
  onSuccess,
  onError,
}: useCategoryMutationProps) => {
  const queryClient = useQueryClient();
  const form = useForm<ICategory>({
    resolver: joiResolver(CategoryJoiSchema),
    defaultValues: {
      name_category: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (category: ICategory): Promise<ApiResponse> => {
      switch (action) {
        case "CREATE":
          return await createCategories(category);
        case "DELETE":
          return await remove(category);
        case "UPDATE":
          return await update(category);
        default:
          return { status: 400, message: "Invalid action" };
      }
    },
    onSuccess: (data) => {
      if (data.status === 200) {
        onSuccess && onSuccess();
        queryClient.invalidateQueries({ queryKey: ["CATEGORY_KEY"] });
      } else {
        console.error("Lỗi khi thực hiện yêu cầu: ", data.message);
      }
    },
    onError: (error) => {
      onError && onError(error);
      console.error("Lỗi khi yêu cầu thất bại: ", error);
    },
  });

  return {
    mutateAsync: mutation.mutateAsync,
    form,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    status: mutation.status, // Thêm thuộc tính status
  };
};

export default useCategoryMutation;
