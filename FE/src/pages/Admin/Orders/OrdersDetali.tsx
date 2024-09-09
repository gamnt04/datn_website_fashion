import { Link, useParams } from "react-router-dom";
import instance from "../../../configs/axios";
import { Query_Orders } from "../../../common/hooks/Order/querry_Order";
import { message, Popconfirm, Radio, Table, Timeline } from "antd";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
import { Mutation_Notification, Query_notification } from "../../../_lib/React_Query/Notification/Query";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { LeftOutlined } from "@ant-design/icons";
import { useState } from "react";
const OrdersDetali = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const [selectedReason, setSelectedReason] = useState("");
  const { data, refetch } = Query_Orders(id);
  const { data: no } = Query_notification()
  const { mutate } = useOrderMutations("CONFIRM_CANCEL");
  const dispathNotification = Mutation_Notification('Add');
  const { mutate: cancel } = useOrderMutations(
    "REQUEST_CANCEL_or_CANCEL_PRODUCT_or_COMPLETED_PRODUCT"
  );
  function yeu_cau(dataBody: { id_item: string | number, comfirm?: boolean | string, numberOrder?: string | number, action?: string }) {
    mutate(dataBody);
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: `Người bán đã ${dataBody?.action === 'xac_nhan' ? 'xác nhận' : 'từ chối'} yêu cầu hủy đơn hàng ${dataBody?.numberOrder}`,
      different: dataBody?.numberOrder,
    })
  }
  const reasons = [
    "Hết hàng",
    "Sai thông tin sản phẩm",
    "Giá nhập thay đổi",
  ];
  function huy_don(dataBody: { id_item: string | number, numberOrder?: string | number, action?: string, cancellationReason?: string; }) {
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: `Người bán đã hủy đơn ${dataBody?.numberOrder} với lí do ${dataBody?.cancellationReason}!`,
      different: dataBody?.numberOrder,
    });
    cancel(dataBody);
  }
  const handleStatusUpdate = async (status: number | string, code_order?: string | number) => {
    if (!data) return;
    const message = (status === 2) ? `Người bán đã xác nhận đơn hàng ${code_order}` : (status === 3) ?
      `Người bán đã giao đơn hàng ${code_order} cho đơn vị vận chuyển!` :
      `Người bán đã từ chối đơn hàng ${code_order}. Vui lòng chọn sản phẩm khác!`
    dispathNotification?.mutate({
      userId: userId,
      receiver_id: data?.userId,
      message: message
    })
    try {
      const response = await instance.patch(`/orders/${id}`, {
        status: status
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
  const formattedDate = data?.updatedAt ? new Date(data.updatedAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';

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
        <div className="flex items-center justify-between mb-5 mt-20 relative">
          <Link to="/admin/orders" className="flex items-center gap-2 text-[#1B7EE2]">
            <LeftOutlined />
            <span>Quay lại</span>
          </Link>
          <h1 className="text-2xl font-semibold absolute left-1/2 transform -translate-x-1/2">Chi Tiết Đơn Hàng</h1>

        </div>
        <div className="my-6 shadow rounded bg-white">
          <div className="p-4 text-black font-semibold">Trạng thái đơn hàng</div>
          <div>

            {data?.status == 5 ? (
              <div className="flex flex-col justify-center items-center gap-7 py-4">
                <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
                  Đã hủy
                </p>
                {no?.notifications.map((item: any) => {
                  if (item?.different === data?.orderNumber) {
                    return (
                      <p>Lý do: {item?.message}</p>
                    )
                  }
                })
                }
              </div>
            ) : (
              <>
                <Timeline mode="alternate">
                  {data?.status >= 1 && (
                    <Timeline.Item color="gray">
                      <p className="ant-typography ant-typography-secondary ant-typography-bold">
                        Chờ xác nhận {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {data?.status >= 2 && (
                    <Timeline.Item color="yellow">
                      <p className="ant-typography ant-typography-warning ant-typography-bold">
                        Đang chuẩn bị hàng {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {data?.status >= 3 && (
                    <Timeline.Item color="blue">
                      <p className="ant-typography ant-typography-primary ant-typography-bold">
                        Đang vận chuyển {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                  {data?.status >= 4 && (
                    <Timeline.Item color="green">
                      <p className="ant-typography ant-typography-success ant-typography-bold">
                        Hoàn thành {formattedDate}
                      </p>
                    </Timeline.Item>
                  )}
                </Timeline>
              </>
            )}

          </div>
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
        <div className="bg-white overflow-x-auto my-6 shadow p-4 rounded">
          <div className=" flex items-center gap-4  border-b pb-4">
            <p className="text-black font-semibold">Phương thức thanh toán</p>
            <p className="w-auto p-3 border-2 border-[#1B7EE2] text-[#1B7EE2] rounded">
              {data?.status == 4
                ? "Đã thanh toán khi nhận hàng"
                : data?.customerInfo?.payment}
            </p>
          </div>
          {/* <div className="flex items-center gap-4 border-b py-3">
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
              </div>
            )}
            <div className="flex gap-2">
              {data?.status == 5 ? (
                <div className="flex justify-between items-center gap-7">
                  <p className="w-auto p-3 border-2 border-red-600 text-red-600 font-bold rounded">
                    Đã hủy
                  </p>
                  {no?.notifications.map((item: any) => {
                    if (item?.different === data?.orderNumber) {
                      return (
                        <p>Lý do: {item?.message}</p>
                      )
                    }
                    console.log(item);

                  })
                  }
                </div>
              ) : (
                <>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 1 ? "border-gray-500 text-gray-500 font-bold" : "border-gray-200 text-gray-200"
                      } rounded`}
                  >
                    Chờ xác nhận
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 2 ? "border-yellow-500 text-yellow-500 font-bold" : "border-yellow-200 text-yellow-200"
                      } rounded`}
                  >
                    Đang chuẩn bị hàng
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 3 ? "border-blue-500 text-blue-500 font-bold" : "border-blue-200 text-blue-200"
                      } rounded`}
                  >
                    Đang vận chuyển
                  </p>
                  <p
                    className={`w-auto p-3 border-2 ${data?.status >= 4 ? "border-green-600 text-green-600 font-bold" : "border-green-200 text-green-200"
                      } rounded`}
                  >
                    Đang giao hàng
                  </p>
                </>
              )}
            </div>
          </div> */}
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
                <p className="py-2 text-gray-800 w-[500px]">
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
            {(data.status === "1") && (
              <>
                <Popconfirm
                  title="Xác nhận đơn hàng?"
                  description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                  onConfirm={() => handleStatusUpdate(2, data?.orderNumber)}
                  okText="Xác nhận"
                  cancelText="Không"
                >
                  <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                    Xác nhận
                  </button>
                </Popconfirm>
                <Popconfirm
                  title="Từ chối xác nhận?"
                  description={
                    <div>
                      <p>Bạn có chắc chắn muốn hủy đơn hàng này?</p>
                      <div>
                        <p>Chọn lý do hủy:</p>
                        <Radio.Group
                          className="flex flex-col gap-2"
                          onChange={(e) =>
                            setSelectedReason(e.target.value)
                          }
                        >
                          {reasons.map((reason, index) => (
                            <Radio key={index} value={reason}>
                              {reason}
                            </Radio>
                          ))}
                        </Radio.Group>
                      </div>
                    </div>
                  }
                  onConfirm={() => huy_don({
                    id_item: data?._id,
                    action: "huy",
                    cancellationReason: selectedReason,
                    numberOrder: data?.orderNumber,
                    // linkUri: items?._id,
                  })}
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
                      onConfirm={() => yeu_cau({ id_item: data?._id, confirm: true, numberOrder: data?.orderNumber, action: 'xac_nhan' })}
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
                      onConfirm={() =>
                        yeu_cau({ id_item: data?._id, confirm: false, numberOrder: data?.orderNumber, action: 'tu_choi' })
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
                    onConfirm={() => handleStatusUpdate(3, data?.orderNumber)}
                    okText="Xác nhận"
                    cancelText="Không"
                  >
                    <button className="w-auto p-3 bg-[#1B7EE2] rounded text-white">
                      Xác nhận vận chuyển
                    </button>
                  </Popconfirm>
                )}
              </>
            )}
            {data.status === "3" && (
              <Popconfirm
                title="Xác nhận đơn hàng?"
                description="Bạn có chắc chắn muốn xác nhận đơn hàng này?"
                okText="Xác nhận"
                cancelText="Không"
              >
                <button className="w-auto p-3 bg-gray-300 rounded text-white cursor-not-allowed" disabled>
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
