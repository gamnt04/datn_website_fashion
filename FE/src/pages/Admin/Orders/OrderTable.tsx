import { Link } from "react-router-dom";

const OrderTable = ({ orders, currentPage, totalPages, onPageChange }: any) => {
    const formatDate = (datetime: any) => {
        if (!datetime) return ""; // Bảo vệ trường hợp datetime không tồn tại
        const date = new Date(datetime);
        return date.toLocaleDateString(); // Lấy ngày tháng năm
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 h-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người mua</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Đặt</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình thức</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="py-3 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.map((order: any) => (
                        <tr key={order._id}>
                            <td className="py-4 px-3 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.userName}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.phone}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.email}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{formatDate(order?.datetime)}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order?.customerInfo?.payment}</td>
                            <td className="py-4 px-3 text-sm text-gray-500">{order.status}</td>
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
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="hover:bg-slate-300 border-2 w-12 h-12"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 ml-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
                {[...Array(totalPages).keys()].map((page) => (
                    <button
                        key={page + 1}
                        onClick={() => onPageChange(page + 1)}
                        className={`hover:bg-slate-300 border-2 w-12 h-12 ${currentPage === page + 1 ? 'bg-slate-300' : ''}`}
                    >
                        {page + 1}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="hover:bg-slate-300 border-2 w-12 h-12"
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
