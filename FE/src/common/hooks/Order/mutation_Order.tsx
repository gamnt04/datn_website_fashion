import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cancel_Order } from "../../../services/orderProduct";


type Action = 'REQUEST_CANCEL' | 'CONFIRM_CANCEL';

export async function useOrderMutations(action: Action) {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: any) => {
            switch (action) {
                case "REQUEST_CANCEL":
                    return await Cancel_Order(data.orderId);
                // case "CONFIRM_CANCEL":
                //     return await confirmCancelOrder(data);
                default:
                    throw new Error('Invalid action');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Order_Key']
            });
        }
    });



    return { mutate, ...rest };
}
