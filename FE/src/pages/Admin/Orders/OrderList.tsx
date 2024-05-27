import { useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import axios from "axios";

const OrderList = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
    const [status, setStatus] = useState<string>('');
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/orders');
                setOrders(data)
                setFilteredOrders(data);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    useEffect(() => {
        if (status) {
            setFilteredOrders(orders.filter(order => order.status === status));
        } else {
            setFilteredOrders(orders);
        }
    }, [status, orders]);

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(event.target.value);
    };
    return (
        <div className="mt-16">
            <div>
                <div className="flex justify-between my-3">
                    <h1 className="text-3xl font-bold mb-6">Quản lý đơn hàng</h1>
                    <select
                        name="status"
                        id="status"
                        className="w-[200px] h-[50px] border rounded-lg px-2"
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="">Lọc trạng thái</option>
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đang chuẩn bị hàng">Đang chuẩn bị hàng</option>
                        <option value="Đang vận chuyển">Đang vận chuyển</option>
                        <option value="Đã giao hàng">Đã giao hàng</option>
                        <option value="Đã hủy">Đã hủy</option>
                    </select>
                </div>
                <OrderTable orders={filteredOrders} />
            </div>
        </div>
    )
}

export default OrderList