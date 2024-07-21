import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { add_items_client, edit_items_client, remove_items_client } from "../../../_lib/Items/Products";

type Action = 'CREATE' | 'EDIT' | 'REMOVE';

export async function Mutation_items_client(action: Action) {

    const my_form = useForm();
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data_body_client: any) => {
            switch (action) {
                case "CREATE":
                    return await add_items_client(data_body_client);
                case "EDIT":
                    return await edit_items_client(data_body_client);
                case "REMOVE":
                    return await remove_items_client(data_body_client);
                default: return;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Product_Key']
            })
        }
    })

    const on_Submit: SubmitHandler<any> = (data) => {
        mutate(data);
    }

    return { my_form, on_Submit, ...rest }

}