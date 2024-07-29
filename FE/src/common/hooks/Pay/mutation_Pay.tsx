import { useMutation } from "@tanstack/react-query";
import { Add_Order } from "../../../services/orderProduct";
import useLocalStorage from "../Storage/useStorage";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

export function Pay_Mutation() {
    const [user] = useLocalStorage("user", {})
    const userId = user?.user?._id
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await Add_Order(order);
            return data;
        },
        onSuccess: async () => {

            messageApi.open({
                type: 'success',
                content: 'Bạn đã đặt hành thành công',
            })
            // navigate("/allorder/order")
            // alert("Đặt hàng thành công")
        },
        onError: () => {
            alert("Đặt hàng thất bại")
        }
    })

    const onSubmit = (formData: any) => {
        mutate(formData);
    };
    return { mutate, onSubmit, userId, contextHolder }
}