import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../../configs/axios";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { IOrder } from "../../../common/interfaces/Orders";

const OrdersDetali = () => {
    const [detali, setDetali] = useState<IOrder | null>(null);
    const { id } = useParams();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;

    useEffect(() => {
        (async () => {
            try {
                const { data } = await instance.get(`/orders/${userId}/${id}`);
                setDetali(data);
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch order details.");
            }
        })();
    }, [id, userId]);

    const handleStatusUpdate = async () => {
        if (!detali) return;
        if (detali.status === "Đã hủy") {
            toast.error("Đơn hàng đã bị hủy, không thể cập nhật trạng thái!");
            return;
        }
        if (!window.confirm("Bạn có chắc chắn muốn xác nhận đơn hàng này không?")) {
            return;
        }
        const statusOrder: Record<string, string> = {
            "Chờ xác nhận": "Đang chuẩn bị hàng",
            "Đang chuẩn bị hàng": "Đang vận chuyển",
            "Đang vận chuyển": "Đã giao hàng",
        };
        const nextStatus = statusOrder[detali.status] || "Đã giao hàng";
        try {
            const { data } = await instance.patch(`/orders/${userId}/${id}`, { status: nextStatus });
            setDetali(data);
            console.log(data);
            toast.success(detali.status === "Đã giao hàng" ? "Đơn hàng đã được giao" : "Cập nhật trạng thái đơn hàng thành công!", { autoClose: 800 });
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật trạng thái đơn hàng thất bại!");
        }
        window.location.reload();
    };

    const handleCancelOrder = async () => {
        if (!detali) return;
        if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
            return;
        }
        try {
            const { data } = await instance.patch(`/orders/${userId}/${id}`, { status: "Đã hủy" });
            setDetali(data);
            toast.success("Đơn hàng đã bị hủy thành công!");
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("Hủy đơn hàng thất bại!");
        }
    };

    if (!detali) return <p>Loading...</p>;

    return (
        <>
            <h1 className="font-bold text-xl text-orange-400 mt-11">Chi tiết sản phẩm</h1>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 h-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ảnh sản phẩm</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {detali.items.map((item) => (
                            <tr key={item._id}>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                    <img src={item.image} alt="" className="w-[50px] h-[50px] object-cover" />
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500">{item.name}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{item.price}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{item.quantity}</td>
                                <td className="py-4 px-6 text-sm text-gray-500">{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="bg-white divide-y divide-gray-200">
                    <div className="flex justify-between py-4">
                        <p>Đơn vị vận chuyển</p>
                        <p>Giao hàng tiết kiệm: 20000 đ</p>
                    </div>
                    <div className="flex gap-8 py-4">
                        <span className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-ticket text-orange-300">
                                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                                <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
                            </svg>
                            <p>Voucher</p>
                        </span>
                        <p>Mã voucher:</p>
                    </div>
                    <p className="flex justify-end py-4">Tông tiền:<span className="text-orange-300 pl-2"> {detali.totalPrice} </span></p>
                </div>
            </div>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <div className="flex items-center gap-4 my-3 border-b py-3">
                    <p>Phương thức thành toán</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{detali.customerInfo.payment}</p>
                </div>
                <div className="flex items-center gap-4 border-b py-3">
                    <p>Trạng thái đơn hàng</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{detali.status}</p>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-6">
                        <div>
                            <p>Tên khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Địa chỉ Email:</p>
                            <p>Địa chỉ khách hàng:</p>
                        </div>
                        <div>
                            <p>{detali.customerInfo.userName}</p>
                            <p>{detali.customerInfo.phone}</p>
                            <p>{detali.customerInfo.email}</p>
                            <p>{detali.customerInfo.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div>
                            <p>Tổng tiền hàng:</p>
                            <p>Tổng giảm giá:</p>
                            <p>Phí vận chuyển:</p>
                            <p>Tổng thanh toán:</p>
                        </div>
                        <div>
                            <p>{detali.totalPrice}</p>
                            <p>{detali.discount}</p>
                            <p>20000 đ</p>
                            <p className="text-orange-300">{detali.totalPrice - detali.discount + 20000}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-center mt-[60px]">
                    <button className="w-auto p-3 bg-orange-300 rounded-lg text-white" onClick={handleStatusUpdate}>
                        {detali.status !== "Đã hủy" ? "Xác nhận đơn" : "Đơn hàng đã bị hủy"}
                    </button>
                    {detali.status !== "Đang chuẩn bị hàng" && detali.status !== "Đang vận chuyển" && detali.status !== "Đã giao hàng" && (
                        <button className="w-auto p-3 bg-rose-500 rounded-lg text-white" onClick={handleCancelOrder} disabled={detali.status === "Đã hủy"}>
                            Từ chối xác nhận
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersDetali;
