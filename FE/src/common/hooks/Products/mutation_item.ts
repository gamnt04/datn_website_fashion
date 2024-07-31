/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  add_items_client,
  edit_items_client,
  remove_items_client,
  remove_multiple_products,
  deleteProduct,
} from "../../../_lib/Items/Products";

type Action =
  | "CREATE"
  | "EDIT"
  | "SOFT_DELETE"
  | "HARD_DELETE"
  | "REMOVE_MULTIPLE";

export function Mutation_items_client(action: Action) {
  const my_form = useForm();
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data_body_client: any) => {
      switch (action) {
        case "CREATE":
          return await add_items_client(data_body_client);
        case "EDIT":
          return await edit_items_client(data_body_client);
        case "SOFT_DELETE":
          return await remove_items_client(data_body_client);
        case "HARD_DELETE":
          return await deleteProduct(data_body_client);
        case "REMOVE_MULTIPLE":
          return await remove_multiple_products(data_body_client);
        default:
          throw new Error("Invalid action type");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Product_Key"],
      });
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const on_Submit = my_form.handleSubmit((data) => {
    mutate(data);
  });

  return { mutate, my_form, on_Submit, ...rest };
}
