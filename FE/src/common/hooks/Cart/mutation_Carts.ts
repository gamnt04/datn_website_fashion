import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add_cart, dow_quantity, remove_quantity, up_quantity } from "../../../_lib/Cart/Cart";


type Actions = "ADD" | "UP" | "DOW" | "REMOVE";

export function Mutation_Cart(action: Actions) {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: any) => {
            switch (action) {
                case "ADD":
                    return await add_cart(data);
                case "UP":
                    return await up_quantity(data);
                case "DOW":
                    return await dow_quantity(data);
                case "REMOVE":
                    return await remove_quantity(data);
                default: return
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Cart_Key']
            })
        },
        onError: () => {
            console.error("Kiem tra lai server hoac internet!")
        }
    })
    return { mutate, ...rest }
}