import { useQuery } from "@tanstack/react-query";
import { GetAllOrder, getOneOrderUser, getOrderById } from "../../../services/orderProduct";

export function List_One_Order_User(userId: string) {
    const { data, ...rest } = useQuery({
        queryKey: ["Order_key", userId],
        queryFn: async () => {
            return await getOneOrderUser(userId)
        }
    })
    console.log(data);

    return { data, ...rest };
}
export const Query_Orders = (id?: string, page?: any, status: string = "") => {
    const key = id ? ['Orders_Key', id] : ['Orders_Key']
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return id ? getOrderById(id) : GetAllOrder(page, status);
        }
    })
    console.log(data);

    return { data, ...rest }

};