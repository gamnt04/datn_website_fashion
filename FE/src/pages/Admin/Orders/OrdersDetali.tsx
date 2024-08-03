import { useParams } from "react-router-dom";
import instance from "../../../configs/axios";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import { useMutation } from "@tanstack/react-query";
import { confirmCancelOrder } from "../../../services/orderProduct";
import { message, Popconfirm, Table } from "antd";

const OrdersDetali = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { id } = useParams();
    const { data, refetch } = Query_Orders(id);
    const { mutate } = useMutation({
        mutationFn: async (comfirm: any) => {
            const { data } = await confirmCancelOrder(comfirm);
            return data;
        },
        onSuccess: (comfirm) => {
            if (comfirm === true) {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã xác nhận hủy đơn hàng!",
                });
                refetch();
            } else {
                messageApi.open({
                    type: "success",
                    content: "Bạn đã từ chối hủy đơn hàng!",
                });
                refetch();
            }
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Thất bại",
            });
        }
    })
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
            console.log(response.data);
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

    const handleCancelOrder = async () => {
        if (!data) return;
        try {
            const response = await instance.patch(`/orders/${id}`, { status: "5" });
            console.log(response.data);
            messageApi.open({
                type: "success",
                content: "Đã hủy đơn hàng!",
            })
            refetch();
        } catch (error) {
            console.log(error);
            messageApi.open({
                type: "error",
                content: "Hủy đơn hàng thất bại!",
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
                <p>{item?.productId?.price_product.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
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
    const isPreparing = data?.status === 2
    if (!data) return <p>Loading...</p>;

    return (
        <>
            {contextHolder}
            <h1 className="font-bold text-3xl text-black mt-16 text-center">Chi tiết đơn hàng</h1>
            <div className="overflow-x-auto my-6 shadow p-[20px] rounded">
                <Table columns={columns} dataSource={dataSort} pagination={false} />
                <div className="bg-white divide-y divide-gray-200">
                    {/* <div className="flex justify-between py-4">
                        <p>Đơn vị vận chuyển</p>
                        <p>Giao hàng tiết kiệm: 20000 đ</p>
                    </div> */}
                    {/* <div className="flex gap-8 py-4">
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
                    </div> */}
                    <p className="flex justify-end items-end pt-4 font-bold">Tổng tiền:<span className="text-black pl-2 text-xl"> {data.totalPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </span></p>
                </div>
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
                    {cancellationRequested ? (
                        <>
                            {!isPreparing ? (
                                <>
                                    <Popconfirm
                                        title="Xác nhận hủy đơn hàng?"
                                        description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                                        onConfirm={() => mutate({ id: data?._id, confirm: true })}
                                        // onCancel={cancel}
                                        okText="Xác nhận"
                                        cancelText="Không"
                                    >
                                        <button className="w-auto p-3 bg-green-500 rounded text-white">
                                            Xác nhận
                                        </button>
                                    </Popconfirm>
                                    <Popconfirm
                                        title="Từ chối hủy đơn hàng?"
                                        description="Bạn có chắc chắn muốn từ chối hủy đơn hàng này?"
                                        onConfirm={() => mutate({ id: data?._id, confirm: false })}
                                        // onCancel={cancel}
                                        okText="Từ chối"
                                        cancelText="Không"
                                    >
                                        <button className="w-auto p-3 bg-red-500 rounded text-white">
                                            Từ chối
                                        </button>
                                    </Popconfirm>
                                </>
                            ) : (<>
                                <button className="w-auto p-3 bg-orange-300 rounded text-white" onClick={handleStatusUpdate}>
                                    {data.status !== "5" ? (data.status === "4" ? "Hoàn thành" : "Xác nhận đơn") : "Đơn hàng đã bị hủy"}
                                </button>
                                {data.status !== "2" && data.status !== "3" && data.status !== "4" && data.status !== "5" && (
                                    <button className="w-auto p-3 bg-rose-500 rounded text-white" onClick={handleCancelOrder}>
                                        Từ chối xác nhận
                                    </button>
                                )}
                            </>)}
                        </>
                    ) : (
                        <>
                            <Popconfirm
                                title="Xác nhận đơn hàng?"
                                description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                                onConfirm={handleStatusUpdate}
                                // onCancel={cancel}
                                okText="Xác nhận"
                                cancelText="Không"
                            >
                                <button className="w-auto p-3 bg-orange-300 rounded text-white">
                                    {data.status !== "5" ? (data.status === "4" ? "Hoàn thành" : "Xác nhận đơn") : "Đơn hàng đã bị hủy"}
                                </button>
                            </Popconfirm>
                            {data.status !== "2" && data.status !== "3" && data.status !== "4" && data.status !== "5" && (
                                <Popconfirm
                                    title="Từ chối xác nhận?"
                                    description="Bạn có chắc chắn muốn từ chối xác nhận đơn hàng này?"
                                    onConfirm={handleCancelOrder}
                                    // onCancel={cancel}
                                    okText="Từ chối"
                                    cancelText="Không"
                                >
                                    <button className="w-auto p-3 bg-rose-500 rounded text-white">
                                        Từ chối xác nhận
                                    </button>
                                </Popconfirm>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default OrdersDetali;
