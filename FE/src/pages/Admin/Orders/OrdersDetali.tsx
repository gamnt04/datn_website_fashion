import { useParams } from "react-router-dom";
import instance from "../../../configs/axios";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import { Button, message, Popconfirm, Table } from "antd";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
const OrdersDetali = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const { data, refetch } = Query_Orders(id);
  const { mutate } = useOrderMutations("CONFIRM_CANCEL");
  const { mutate: cancel } = useOrderMutations(
    "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
  );
  const handleStatusUpdate = async () => {
    if (!data) return;
    if (data.status === "5") {
      messageApi.open({
        type: "error",
        content: "Đơn hàng đã bị hủy, không thể cập nhật trạng thái!"
      });
      return;
    }

    const statusOrder: Record<string, string> = {
      "1": "2",
      "2": "3",
      "3": "4"
    };
    const nextStatus = statusOrder[data.status] || "4";
    try {
      const response = await instance.patch(`/orders/${id}`, {
        status: nextStatus
      });
      messageApi.open({
        type: "success",
        content:
          response.data.status === "4"
            ? "Đơn hàng đã được giao"
            : "Cập nhật trạng thái đơn hàng thành công!"
      });
      refetch();
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Cập nhật trạng thái đơn hàng thất bại!"
      });
    }
  };
  const cancellationRequested = data?.cancellationRequested;
  const dataSort = data?.items?.map((item: any) => ({
    key: item._id,
    ...item
  }));
  const columns = [
    {
      title: "Ảnh Sản Phẩm",
      dataIndex: "image_product",
      key: "image_product",
      render: (_: any, item: any) => (
        <img
          src={item?.productId?.image_product}
          alt=""
          className="w-[80px] h-[80px] object-cover "
        />
      )
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name_product",
      key: "name_product",
      render: (_: any, item: any) => (
        <div>
          <p className="text-lg font-medium w-[80%]">
            {item?.productId?.name_product}
          </p>
          <p className=" mt-1 font-medium text-[#0000008A]">
            Loại: {item?.color_item} - {item?.name_size}
          </p>
        </div>
      )
    },
    {
      title: "Giá Sản Phẩm",
      dataIndex: "price_product",
      key: "price_product",
      render: (_: any, item: any) => (
        <p className="">
          {item?.price_item.toLocaleString("vi", {
            style: "currency",
            currency: "VND"
          })}
        </p>
      )
    },
    {
      title: "Số Lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, item: any) => (
        <p className="text-center">{item?.quantity}</p>
      )
    },
    {
      title: "Tổng Tiền",
      dataIndex: "price_product",
      key: "price_product",
      render: (_: any, item: any) => (
        <p>
          {(item?.total_price_item).toLocaleString("vi", {
            style: "currency",
            currency: "VND"
          })}
        </p>
      )
    }
  ];
  if (!data) return <p>Loading...</p>;

  return (
    <>
      {contextHolder}
      <div className="mx-6">
        {" "}
        <div className="flex items-center justify-between mb-5 mt-20">
          <h1 className="text-2xl font-semibold">Chi Tiết Đơn Hàng</h1>
        </div>
        <div className="overflow-x-auto my-6 shadow  rounded">
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
            <p className="flex justify-end items-end p-4 text-[#0000008A]">
              Tổng số tiền :
              <span className="text-[#ee4d2d] pl-2 text-xl">
                {" "}
                {data.totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND"
                })}{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white overflow-x-auto my-6 shadow p-[20px] rounded">
          <div className=" flex items-center gap-4 my-3 border-b py-3">
            <p className="text-black font-semibold">Phương thức thanh toán</p>
            <p className="w-auto p-3 border-2 border-[#1B7EE2] text-[#1B7EE2] rounded">
              {data?.customerInfo?.payment}
            </p>
          </div>
          <div className="flex items-center gap-4 border-b py-3">
            <p className="text-black font-semibold w-[20%]">Trạng thái đơn hàng</p>
            {data?.status == 1 ? (
              <p className="w-auto p-3 border-2 border-gray-500 text-gray-500 rounded">
                Chờ xác nhận{" "}
              </p>
            ) : data?.status == 2 ? (
              <p className="w-auto p-3 border-2 border-yellow-500 text-yellow-500 rounded">
                Đang chuẩn bị hàng
              </p>
            ) : data?.status == 3 ? (
              <p className="w-auto p-3 border-2 border-blue-500 text-blue-500 rounded">
                Đang vận chuyển
              </p>
            ) : data?.status == 4 ? (
              <p className="w-auto p-3 border-2 border-green-600 text-green-600 rounded">
                Đang giao hàng
              </p>
            ) : (
              <div className="flex items-center justify-between w-full">
                <p className="w-auto p-3 border-2 border-red-600 text-red-600 rounded">
                  Đã hủy
                </p>
                <p className="font-bold">Lý do: <span className="font-normal text-slate-500">{data.cancellationReason}</span></p>
              </div>

            )}
          </div>
          <div className="flex justify-between my-4">
            <div className="flex gap-6">
              <div className="flex-1">
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tên khách hàng</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Số điện thoại</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Địa chỉ Email</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Địa chỉ khách hàng</span>
                  <span>:</span>
                </p>
              </div>

              <div className="flex-1">
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.userName}
                </p>
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.phone}
                </p>
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.email}
                </p>
                <p className="py-2 text-gray-800">
                  {data?.customerInfo?.address}
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-1 ">
                <p className="flex w-[150px] justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tổng tiền hàng</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Phí vận chuyển</span>
                  <span>:</span>
                </p>
                <p className="flex justify-between items-center space-x-2 py-2 text-gray-600">
                  <span className="font-semibold">Tổng thanh toán</span>
                  <span>:</span>
                </p>
              </div>
              <div className="flex-1">
                <p className="py-2 text-gray-800">
                  {data?.totalPrice.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
                <p className="py-2 text-gray-800">0 đ</p>
                <p className="py-2 text-[#ee4d2d] text-xl">
                  {data?.totalPrice?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND"
                  })}
                </p>
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
                  <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                    Xác nhận
                  </button>
                </Popconfirm>
                <Popconfirm
                  title="Từ chối xác nhận?"
                  description="Bạn có chắc chắn muốn từ chối xác nhận đơn hàng này?"
                  onConfirm={() => cancel({ id_item: data._id, action: 'huy' })}
                  okText="Từ chối"
                  cancelText="Không"
                >
                  <button className="w-auto p-3 bg-red-500 rounded text-white">
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
                      onConfirm={() => mutate({ id_item: data?._id, confirm: true })}
                      okText="Xác nhận"
                      cancelText="Không"
                    >
                      <Button className="w-auto p-3 bg-green-500 rounded text-white">
                        Xác nhận yêu cầu
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title="Từ chối hủy đơn hàng?"
                      description="Bạn có chắc chắn muốn từ chối hủy đơn hàng này?"
                      onConfirm={() =>
                        mutate({ id_item: data?._id, confirm: false })
                      }
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
                    <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                      Xác nhận
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
                <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white cursor-not-allowed" disabled>
                  Đang vận chuyển
                </button>
              </Popconfirm>
            )}
            {data.status === "4" && (
              <button
                className="w-auto p-3 bg-green-600 rounded text-white cursor-not-allowed"
                disabled
              >
                Đã hoàn thành
              </button>
            )}
            {data.status === "5" && (
              <button
                className="w-auto p-3 bg-gray-500 rounded text-white cursor-not-allowed"
                disabled
              >
                Đơn hàng đã bị hủy
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersDetali;
