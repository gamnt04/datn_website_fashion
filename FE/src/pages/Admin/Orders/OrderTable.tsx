import { Link } from "react-router-dom";

const OrderTable = ({ orders, currentPage, goToPage, totalPages }: any) => {
    const formatDate = (datetime: any) => {
        if (!datetime) return ""; // Bảo vệ trường hợp datetime không tồn tại
        const date = new Date(datetime);
        return date.toLocaleDateString(); // Lấy ngày tháng năm
    };

    // for (let i = 0; i < orders.length; i++) {
    //     console.log(orders[i]);
    // }
    console.log(orders);


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 h-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người mua</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Đặt</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hình thức</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="py-3 px-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.map((order: any) => (
                        <tr key={order._id}>
                            <td className="py-4 px-3 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.userName}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.phone}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.email}</td>
                            <td className="py-4 px-3 text-sm text-gray-500 text-center">{formatDate(order?.datetime)}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.payment}</td>
                            <td className="py-4 px-3 text-sm text-gray-500 text-center">
                                {order?.status == 1 ? "Chờ xác nhận" :
                                    order?.status == 2 ? "Đang chuẩn bị" :
                                        order?.status == 3 ? "Đang vận chuyển" :
                                            order?.status == 4 ? "Đã giao hàng" : "Đã hủy"}
                            </td>
                            <td className="py-4 px-3 text-sm text-gray-500 flex justify-center items-center gap-5 relative">
                                <Link to={`/admin/orders/${order._id}/orderDetali`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 cursor-pointer"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </Link>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
            <div className="flex justify-center gap-4 my-6">
                <button
                    className="hover:bg-slate-300 border-2 w-12 h-12"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {/* Render nút phân trang một cách động */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`hover:bg-slate-300 border-2 w-12 h-12 ${currentPage === index + 1 ? 'bg-slate-300' : ''}`}
                        onClick={() => goToPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className="hover:bg-slate-300 border-2 w-12 h-12"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default OrderTable;
