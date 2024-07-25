import { useMutation } from "@tanstack/react-query";
import { Add_Order } from "../../../services/orderProduct";
import useLocalStorage from "../Storage/useStorage";
import { List_Cart } from "../Cart/querry_Cart";
import { reduce } from "lodash";
import { useNavigate } from "react-router-dom";

export function Pay_Mutation() {
    const [user] = useLocalStorage("user", {})
    const userId = user?.user?._id
    const { data } = List_Cart(userId);
    console.log(data);

    const navigate = useNavigate()
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await Add_Order(order);
            console.log(data);
            return data;
        },
        onSuccess: async () => {
            navigate("/allorder/order")
            // alert("Đặt hàng thành công")
        },
        onError: () => {
            alert("Đặt hàng thất bại")
        }


    })
    console.log(data);

    // console.log(order);
    // const calcuateTotal = () => {
    //     if (!data || !data.products) return 0
    //     return reduce(data.products, (total: any, product: any) => total + product.price * product.quantity, 0)
    // }
    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data,
            totalPrice: data?.total_price,
            customerInfo: formData,

        });


    };
    return { mutate, onSubmit, data }
}