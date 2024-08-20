import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cancel_Order, cancel_product, complete_product, confirmCancelOrder } from "../../../services/orderProduct";
import { message } from "antd";


type Action = 'REQUEST_CANCEL' | 'CONFIRM_CANCEL' | 'CANCEL_PRODUCT' | 'COMPLETED_PRODUCT' | 'UPDATE_ORDER';

export function useOrderMutations(action: Action) {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: any) => {
            switch (action) {
                case "REQUEST_CANCEL":
                    return await Cancel_Order(data);
                case "CONFIRM_CANCEL":
                    return await confirmCancelOrder(data);
                case "CANCEL_PRODUCT":
                    return await cancel_product(data);
                case "COMPLETED_PRODUCT":
                    return await complete_product(data);
                default:
                    throw new Error('Invalid action');
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['Order_Key']
            });
            switch (action) {
                case "REQUEST_CANCEL":
                    messageApi.open({
                        type: 'success',
                        content: 'Yêu cầu hủy đơn hàng thành công',
                    })
                    break;
                case "CONFIRM_CANCEL":
                    messageApi.open({
                        type: 'success',
                        content: 'Xác nhận hủy đơn hàng thành công',
                    })
                    break;
                case "CANCEL_PRODUCT":
                    messageApi.open({
                        type: 'success',
                        content: 'Hủy đơn hàng thành công',
                    })
                    break;
                case "COMPLETED_PRODUCT":
                    messageApi.open({
                        type: 'success',
                        content: 'Đã nhận hàng thành công',
                    })
                    break;
                default:
                    break;
            }
        }
    })
    return { mutate, ...rest, contextHolder };
}
