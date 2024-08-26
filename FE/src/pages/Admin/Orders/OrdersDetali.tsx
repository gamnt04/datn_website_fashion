import { useParams } from "react-router-dom";
import instance from "../../../configs/axios";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import { message, Popconfirm, Table } from "antd";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";

const OrdersDetali = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();
    const { data, refetch } = Query_Orders(id);
    const { mutate, contextHolder: h } = useOrderMutations('CONFIRM_CANCEL')
    const { mutate: cancel, contextHolder: r } = useOrderMutations('REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT');
    const handleStatusUpdate = async () => {
        if (!data) return;
        if (data.status === "5") {
            messageApi.open({
                type: "error",
                content: "Đơn hàng đã bị hủy, không thể cập nhật trạng thái!",
            })
            return;
        }

        const statusOrder: Record<string, string> = {
            "1": "2",
            "2": "3",
            "3": "4",
        };
        const nextStatus = statusOrder[data.status] || "4";
        try {
            const response = await instance.patch(`/orders/${id}`, { status: nextStatus });
            messageApi.open({
                type: "success",
                content: response.data.status === "4" ? "Đơn hàng đã được giao" : "Cập nhật trạng thái đơn hàng thành công!",
            })
            refetch();
        } catch (error) {
            messageApi.open({
                type: "error",
                content: "Cập nhật trạng thái đơn hàng thất bại!",
            })
        }
    };
    const cancellationRequested = data?.cancellationRequested;
    const dataSort = data?.items?.map((item: any) => ({
        key: item._id,
        ...item
    }))
    const columns = [
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image_product',
            key: 'image_product',
            render: (_: any, item: any) => (
                <img src={item?.productId?.image_product} alt="" className="w-[70px] h-[70px] object-cover " />
            )
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name_product',
            key: 'name_product',
            render: (_: any, item: any) => (
                <div>
                    <p className="text-lg font-medium w-[80%]">{item?.productId?.name_product}</p>
                    <p className=" mt-1 font-medium">Loại: {item?.color_item} - {item?.name_size}</p>
                </div>
            )
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price_product',
            key: 'price_product',
            render: (_: any, item: any) => (
                <p>{item?.price_item.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_: any, item: any) => (
                <p className="text-center">{item?.quantity}</p>
            )
        },
        {
            title: 'Tông tiền',
            dataIndex: 'price_product',
            key: 'price_product',
            render: (_: any, item: any) => (
                <p>
                    {(item?.total_price_item).toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                </p>
            )
        },

    ];
    if (!data) return <p>Loading...</p>;

    return (
        <>
            {contextHolder}
            {h}
            {r}
            <h1 className="font-bold text-3xl text-black mt-4 text-center">Chi tiết đơn hàng</h1>
            <div className="overflow-x-auto my-6 shadow p-[20px] rounded">
                <Table columns={columns} dataSource={dataSort} pagination={false} />
            </div>
            <div className="overflow-x-auto my-6 shadow p-[20px] rounded">
                <div className="flex items-center gap-4 my-3 border-b py-3">
                    <p>Phương thức thanh toán</p>
                    <p className="w-auto p-3 border-2 border-black text-black rounded">{data?.customerInfo?.payment}</p>
                </div>
                <div className="flex items-center gap-4 border-b py-3">
                    <p>Trạng thái đơn hàng</p>
                    <p className="w-auto p-3 border-2 border-black text-black rounded">{data?.status == 1 ? "Chờ xác nhận" :
                        data?.status == 2 ? "Đang chuẩn bị hàng" :
                            data?.status == 3 ? "Đang vận chuyển" :
                                data?.status == 4 ? "Đã giao hàng" : "Đã hủy"}</p>
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-6">
                        <div className="*:py-1">
                            <p>Tên khách hàng:</p>
                            <p>Số điện thoại:</p>
                            <p>Địa chỉ Email:</p>
                            <p>Địa chỉ khách hàng:</p>
                        </div>
                        <div className="*:py-1">
                            <p>{data?.customerInfo?.userName}</p>
                            <p>{data?.customerInfo?.phone}</p>
                            <p>{data?.customerInfo?.email}</p>
                            <p>{data?.customerInfo?.address}</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="*:py-1">
                            <p>Tổng tiền hàng:</p>
                            {/* <p>Tổng giảm giá:</p> */}
                            <p>Phí vận chuyển:</p>
                            <p>Tổng thanh toán:</p>
                        </div>
                        <div className="*:py-1">
                            <p>{data?.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                            {/* <p>10000</p> */}
                            <p>0 đ</p>
                            <p className="font-bold">{(data?.totalPrice)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 justify-center mt-[60px]">
                    {data.status === "1" && (
                        <>
                            <Popconfirm
                                title="Xác nhận đơn hàng?"
                                description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                                onConfirm={handleStatusUpdate}
                                okText="Xác nhận"
                                cancelText="Không"
                            >
                                <button className="w-auto p-3 bg-orange-300 rounded text-white">
                                    {data.status === "1" ? "Chờ xác nhận" : ""}
                                </button>
                            </Popconfirm>
                            <Popconfirm
                                title="Từ chối xác nhận?"
                                description="Bạn có chắc chắn muốn từ chối xác nhận đơn hàng này?"
                                onConfirm={() => cancel({ id_item: data._id, action: 'huy' })}
                                okText="Từ chối"
                                cancelText="Không"
                            >
                                <button className="w-auto p-3 bg-rose-500 rounded text-white">
                                    Từ chối
                                </button>
                            </Popconfirm>
                        </>
                    )}
                    {data.status === "2" && (
                        <>
                            {cancellationRequested ? (
                                <>
                                    <Popconfirm
                                        title="Xác nhận hủy đơn hàng?"
                                        description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                                        onConfirm={() => mutate({ id: data?._id, confirm: true })}
                                        okText="Xác nhận"
                                        cancelText="Không"
                                    >
                                        <button className="w-auto p-3 bg-green-500 rounded text-white">
                                            Xác nhận yêu cầu
                                        </button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="Từ chối hủy đơn hàng?"
                                        description="Bạn có chắc chắn muốn từ chối hủy đơn hàng này?"
                                        onConfirm={() => mutate({ id: data?._id, confirm: false })}
                                        okText="Từ chối"
                                        cancelText="Không"
                                    >
                                        <button className="w-auto p-3 bg-red-500 rounded text-white">
                                            Từ chối yêu cầu
                                        </button>
                                    </Popconfirm>
                                </>
                            ) : (
                                <Popconfirm
                                    title="Xác nhận đơn hàng?"
                                    description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                                    onConfirm={handleStatusUpdate}
                                    okText="Xác nhận"
                                    cancelText="Không"
                                >
                                    <button className="w-auto p-3 bg-orange-300 rounded text-white">
                                        {data.status === "2" ? "Xác nhận vận chuyển" : ""}
                                    </button>
                                </Popconfirm>
                            )}
                        </>
                    )}
                    {data.status === "3" && (
                        <Popconfirm
                            title="Xác nhận đơn hàng?"
                            description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                            onConfirm={handleStatusUpdate}
                            okText="Xác nhận"
                            cancelText="Không"
                        >
                            <button className="w-auto p-3 bg-gray-300 rounded text-white cursor-not-allowed" disabled>
                                {data.status === "3" ? "Đang vận chuyển" : ""}
                            </button>
                        </Popconfirm>
                    )}
                    {data.status === "4" && (
                        <button className="w-auto p-3 bg-gray-300 rounded text-white cursor-not-allowed" disabled>
                            Đã hoàn thành
                        </button>
                    )}
                    {data.status === "5" && (
                        <button className="w-auto p-3 bg-gray-300 rounded text-white cursor-not-allowed" disabled>
                            Đơn hàng đã bị hủy
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersDetali;
