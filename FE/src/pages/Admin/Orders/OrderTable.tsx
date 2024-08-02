import { Pagination, Table } from "antd";
import { Link } from "react-router-dom";

const OrderTable = ({ orders, currentPage, goToPage, totalPages }: any) => {
    const formatDate = (datetime: any) => {
        if (!datetime) return "";
        const date = new Date(datetime);
        return date.toLocaleDateString();
    };
    const dataSort = orders?.map((orders: any) => ({
        key: orders._id,
        ...orders
    }))

    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: 'Người mua',
            dataIndex: 'userName',
            key: 'userName',
            render: (_: any, order: any) => (
                <p>{order?.customerInfo?.userName}</p>
            )
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            render: (_: any, order: any) => (
                <p>{order?.customerInfo?.phone}</p>
            )
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (_: any, order: any) => (
                <p>{order?.customerInfo?.email}</p>
            )
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'datetime',
            key: 'datetime',
            render: (_: any, order: any) => (
                <p>{formatDate(order?.datetime)}</p>
            )
        },
        {
            title: 'Hình thức',
            dataIndex: 'payment',
            key: 'payment',
            render: (_: any, order: any) => (
                <p>{order?.customerInfo?.payment}</p>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (_: any, order: any) => (
                <p>{order?.status == 1 ? "Chờ xác nhận" :
                    order?.status == 2 ? "Đang chuẩn bị" :
                        order?.status == 3 ? "Đang vận chuyển" :
                            order?.status == 4 ? "Đã giao hàng" : "Đã hủy"}</p>
            )
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_: any, orders: any) => (
                <>
                    <Link to={`/admin/orders/${orders._id}/orderDetali`}>
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
                </>
            )
        },
    ];


    return (
        <div className="overflow-x-auto">
            <Table columns={columns} dataSource={dataSort} pagination={false}></Table>
            <div className="flex justify-between items-center mt-4">
                <div className="max-w-full overflow-hidden"></div>
                <Pagination
                    current={currentPage}
                    pageSize={10}
                    total={totalPages * 10}
                    onChange={goToPage}
                />
            </div>

        </div >
    );
};

export default OrderTable;
