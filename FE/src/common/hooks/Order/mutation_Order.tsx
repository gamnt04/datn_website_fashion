import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Cancel_Order, cancel_product, complete_product, confirmCancelOrder } from "../../../services/orderProduct";
import { message } from "antd";


type Action = 'CONFIRM_CANCEL' | 'UPDATE_ORDER' | 'REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT';

export function useOrderMutations(action: Action) {
    const queryClient = useQueryClient();
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (data: { id_item: string | number, action?: string, cancellationReason?: string }) => {
            switch (action) {
                case "CONFIRM_CANCEL":
                    return await confirmCancelOrder(data);
                case 'REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT':
                    if (data?.action === 'huy') {
                        return await cancel_product(data.id_item);
                    }
                    if (data?.action === 'yeu_cau_huy') {
                        return await Cancel_Order(data?.id_item, data.cancellationReason);
                    }
                    return await complete_product(data?.id_item);
                default:
                    throw new Error('Invalid action');
            }
        },
        onSuccess: (data) => {
            let message = '';
            queryClient.invalidateQueries({
                queryKey: ['Order_Key']
            });
            switch (action) {
                case "CONFIRM_CANCEL":
                    if (data.data_status_order === true) {
                        message = 'Yêu cầu hủy đơn hàng đã được xác nhận';
                    } else {
                        message = 'Lỗi không thể gửi yêu cầu hủy đơn!';
                    }
                    break;
                case "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT":
                    if (data?.message === 'huy') {
                        message = 'Hủy đơn hàng thành công';

                    }
                    else if (data?.message === 'yeu_cau_huy') {
                        message = 'Yêu cầu hủy đơn hàng thành công';
                    }
                    else {
                        message = 'Đã nhận hàng thành công';
                    }
                    break;
                default:
                    break;
            }
            messageApi.open({
                type: 'success',
                content: message,
            })
        }
    })
    return { mutate, ...rest, contextHolder };
}