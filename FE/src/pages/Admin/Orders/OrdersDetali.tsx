import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OrdersDetali = () => {
    const [detali, setDetali] = useState([])
    const { id } = useParams()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/orders/${id}`)
                setDetali(data)
            } catch (error) {
                console.log(error);
            }
        })()

    }, [id])

    const handleStatusUpdate = async () => {
        if (!detali) return;
        if (detali.status === "Đã hủy") {
            toast.error("Đơn hàng đã bị hủy, không thể cập nhật trạng thái!");
            return;
        }
        const statusOrder: any = {
            "Chờ xác nhận": "Đang chuận bị hàng",
            "Đang chuận bị hàng": "Đang vận chuyển",
            "Đang vận chuyển": "Đã giao hàng",
        };



        const nextStatus = statusOrder[detali.status] || "Đã giao hàng";
        try {
            const { data } = await axios.patch(`http://localhost:3000/orders/${id}`, { status: nextStatus });
            setDetali(data);
            toast.success("Cập nhật trạng thái đơn hàng thành công!")
        } catch (error) {
            console.log(error);
            toast.error("Cập nhật trạng thái đơn hàng thất bại!")
        }


    };
    console.log(handleStatusUpdate);


    if (!detali) return <p>Loading...</p>;
    return (
        <>
            <h1 className="font-bold text-xl text-orange-400 mt-11">Chi tiết sản phẩm</h1>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 h-auto">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên sản phẩm</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số lượng</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">

                        <tr>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                <img src={detali.image} width={100} alt="" />
                            </td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{detali.productName}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{detali.price} VND</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{detali.quantity}</td>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">600.000 VND</td>
                        </tr>

                    </tbody>
                </table>
                <div className="bg-white divide-y divide-gray-200">
                    <div className="flex justify-between py-4">
                        <p>Đơn vị vận chuyển</p>
                        <p>Giao hàng tiết kiệm: 20.000 VND</p>
                    </div>
                    <div className="flex gap-8 py-4">
                        <span className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ticket text-orange-300 "><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
                            <p>Voucher</p>
                        </span>
                        <p>Mã voucher: MAGIAM50%</p>
                    </div>
                    <p className="flex justify-end py-4">Tông tiền: <span className="text-orange-300">600.000 VND</span></p>
                </div>
            </div>
            <div className="overflow-x-auto my-6 shadow-lg p-[20px] rounded-lg">
                <div className="flex items-center gap-2 my-3 border-b py-3">
                    <p>Phương thức thành toán</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{detali.hinhthuc}</p>
                </div>
                <div className="flex items-center gap-2  border-b py-3">
                    <p>Trạng thái đơn hàng</p>
                    <p className="w-auto p-3 border-2 border-orange-300 text-orange-300">{detali.status}</p>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-6">
                        <div>
                            <p>Tên khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Địa chỉ Email:</p>

                        </div>
                        <div>
                            <p>{detali.userName}</p>
                            <p>{detali.phone}</p>
                            <p>{detali.email}</p>

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
                            <p>600.000 VND</p>
                            <p>50.000 VND</p>
                            <p>20.000 VND </p>
                            <p>570.000 VND</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button className="w-[150px] p-3 bg-orange-300 rounded-lg text-white" onClick={handleStatusUpdate}>{detali.status !== "Đã hủy" ? "Xác nhận đơn" : "Đơn hàng đã bị hủy"}</button>
                </div>
            </div >
        </>
    )
};

export default OrdersDetali;
