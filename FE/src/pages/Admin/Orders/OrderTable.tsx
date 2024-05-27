
import { Link } from "react-router-dom";


const OrderTable = ({ orders }: any) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 h-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SĐT</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên người mua</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Đặt</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình thức</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                        <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders?.map((order: any) => (
                        <tr key={order.id}>
                            <td className="py-4 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.phone}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.userName}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.email}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.datetime}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.hinhthuc}</td>
                            <td className="py-4 px-6 text-sm text-gray-500">{order.status}</td>
                            <td className="py-4 px-6 text-sm text-gray-500 flex justify-center items-center gap-5 relative">

                                <Link to={`/admin/orders/${order.id}/orderDetali`}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6 mt-7 cursor-pointer"
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
        </div>
    );
};

export default OrderTable;
