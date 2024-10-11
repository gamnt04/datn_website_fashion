import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import {
  Add_Address,
  List_Address,
} from "../../../components/common/Client/_component/Address";
import {
  Address,
  Chevron_right,
} from "../../../components/common/Client/_component/Icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import { toast } from "react-toastify";
import { filter_positive_Stock_Item } from "../../../_lib/Config/Filter_stock_cart_and_order";
import { Mutation_Notification } from "../../../_lib/React_Query/Notification/Query";
import instance from "../../../configs/axios";

const Pay = () => {
  const routing = useNavigate();
  const [user] = useLocalStorage("user", {});
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(false);
  const userId = user?.user?._id;

  const [vouchers, setVouchers] = useState([]);
  const [isVoucherModalVisible, setIsVoucherModalVisible] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [voucherDetails, setVoucherDetails] = useState<any>(null);

  const { data: auth } = List_Auth(userId);
  const { data, isPending } = List_Cart(userId);
  const [selectedAddress, setSelectedAddress] = useState<any>();
  const { register, handleSubmit, setValue } = useForm();
  const {
    onSubmit,
    contextHolder,
    messageApi,
    isPending: loadingOrder,
  } = Pay_Mutation();
  const { mutate } = Mutation_Notification("Add");

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await instance.get("/voucher");

        const activeVouchers = response.data.vouchers.filter(
          (voucher: any) => voucher.isActive === true
        );

        setVouchers(activeVouchers);
      } catch (error) {
        toast.error("Không thể tải danh sách voucher", { autoClose: 1200 });
      }
    };
    fetchVouchers();
  }, []);

  useEffect(() => {
    if (!userId) {
      routing("/login");
    }
    if (item_order_checkked?.length < 1) {
      routing("/login");
    }
  }, [userId, routing]);

  useEffect(() => {
    if (auth && auth?.address) {
      const defaultAddress = auth?.address?.find(
        (item: any) => item.checked === true
      );
      const address = selectedAddress || defaultAddress;
      if (address) {
        setSelectedAddress(address);
        setValue("userName", address.fullName);
        setValue("phone", address.phoneNumber);
        setValue("email", auth.email);
        setValue("address", `${address.addressDetails} - ${address.address}`);
      }
    }
  }, [auth, selectedAddress, setValue]);

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
    setDiscountAmount(0);
    setFinalAmount(totalPrice);
    setSelectedVoucherCode(null);
    setDiscountCode("");
  };
  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [selectedVoucherCode, setSelectedVoucherCode] = useState<string | null>(
    null
  );
  const handleApplyDiscount = async () => {
    try {
      const response = await instance.post(`/voucher/use`, {
        code_voucher: discountCode,
        totalAmount: totalPrice,
        userId: user?.user?._id,
      });

      const { discount, finalAmount, message } = response.data;

      setDiscountAmount(discount);
      setFinalAmount(finalAmount);

      toast.success(message, { autoClose: 1200 });
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { autoClose: 1200 });
      } else if (error instanceof Error) {
        toast.error(error.message, { autoClose: 1200 });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau.", {
          autoClose: 1200,
        });
      }
    }
  };
  const showVoucherDetails = (voucher: any) => {
    setVoucherDetails(voucher);
    setIsDetailModalVisible(true);
  };

  const handleCancelDetailsModal = () => {
    setIsDetailModalVisible(false);
    setVoucherDetails(null);
  };
  const showVoucherModal = () => {
    setIsVoucherModalVisible(true);
  };

  const handleCancel = () => {
    setIsVoucherModalVisible(false);
  };

  const handleApplyVoucher = async (e: React.MouseEvent, voucher: any) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/voucher/use`, {
        code_voucher: voucher.code_voucher,
        totalAmount: totalPrice,
        userId: user?.user?._id,
      });

      const { discount, finalAmount, message } = response.data;

      setDiscountAmount(discount);
      setFinalAmount(finalAmount);
      setSelectedVoucher(voucher);
      setDiscountCode("");
      setSelectedVoucherCode(voucher.code_voucher);

      toast.success(message, { autoClose: 1200 });
      setIsVoucherModalVisible(false);
    } catch (error) {
      // Narrow the type of error by checking if it is an instance of AxiosError
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, { autoClose: 1200 });
      } else if (error instanceof Error) {
        // Handle generic JavaScript errors
        toast.error(error.message, { autoClose: 1200 });
      } else {
        toast.error("Có lỗi xảy ra, vui lòng thử lại sau.", {
          autoClose: 1200,
        });
      }
    }
  };
  const handleTAdd = () => {
    setAddress(!address);
    if (isOpen) setIsOpen(false);
    if (isOpen) setIsOpen(false);
  };

  const handleAddress = () => {
    setIsOpen(!isOpen);
    if (address) setAddress(false);
    if (address) setAddress(false);
  };
  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setIsOpen(false);
  };

  const item_order_checkked = data?.products?.filter(
    (value: any) => value?.status_checked
  );

  const totalPrice = item_order_checkked?.reduce(
    (a: any, curr: any) => a + curr?.total_price_item,
    0
  );
  const item_lon_hon_0 = filter_positive_Stock_Item(item_order_checkked);
  const dataSort = item_lon_hon_0?.map((order: any) => {
    return {
      key: order.productId._id,
      ...order,
    };
  });

  const sortedVouchers = vouchers.sort((a: any, b: any) => {
    const aDisabled =
      (a.allowedUsers.length > 0 && !a.allowedUsers.includes(userId)) ||
      a.usedCount >= a.quantity_voucher;
    const bDisabled =
      (b.allowedUsers.length > 0 && !b.allowedUsers.includes(userId)) ||
      b.usedCount >= b.quantity_voucher;

    if (aDisabled && !bDisabled) return 1;
    if (!aDisabled && bDisabled) return -1;
    return 0;
  });
  // add order
  const onAddOrder = async (data_form: any) => {
    const discountCodeToUse = selectedVoucherCode || discountCode;
    if (!data_form.address || data_form?.address.trim() === "") {
      messageApi.open({
        type: "warning",
        content: "Vui lòng chọn địa chỉ!",
      });
      return;
    }

    // Validate stock trước khi đặt hàng
    for (const i of item_order_checkked) {
      if (i?.productId?.attributes) {
        const check_color = i?.productId?.attributes?.values?.find(
          (a: any) => a?.color === i?.color_item
        );
        const check_size = check_color?.size?.find(
          (b: any) =>
            (b?.name_size?.trim() ? b?.name_size : undefined) === i?.name_size
        );
        if (i?.quantity > check_size?.stock_attribute) {
          toast.error(
            `Sản phẩm ${i?.productId?.name_product} hiện tại 
          chỉ còn ${check_size?.stock_attribute}. Vui lòng giảm số lượng trước khi thanh toán!`,
            { autoClose: 1200 }
          );
          return;
        }
      } else if (i?.quantity > i?.productId?.stock) {
        toast.error(
          `Sản phẩm ${i?.productId?.name_product} hiện tại 
          chỉ còn ${i?.productId?.stock}. Vui lòng giảm số lượng trước khi thanh toán!`,
          { autoClose: 1200 }
        );
        return;
      }
    }

    const item_order = {
      userId: userId,
      items: item_order_checkked,
      customerInfo: {
        ...data_form,
      },

      discountCode: discountCodeToUse, // Lưu mã giảm giá
      discountAmount: discountAmount, // Lưu số tiền giảm giá
      totalPrice: finalAmount > 0 ? finalAmount : totalPrice,
      email: user?.user?.email,
    };
    try {
      if (data_form.payment === "VNPAY") {
        const orderId = JSON.parse(
          sessionStorage.getItem("item_order") as string
        );
        sessionStorage.setItem(
          "customerInfo",
          JSON.stringify({ ...data_form })
        );
        const UrlPayment = await axios.post(
          `http://localhost:2004/api/v1/create_payment_url`,
          {
            orderId: nanoid(24),
            totalPrice: totalPrice,
            orderDescription: `Order ${orderId._id}`,
            language: "vn",
          }
        );
        sessionStorage.setItem("item_order", JSON.stringify(item_order));
        window.location.href = UrlPayment.data.paymentUrl;
      } else {
        onSubmit(item_order);
      }
      mutate({
        userId: userId,
        receiver_id: "nguyenvana@gmail.com",
        message: `Người dùng ${user?.user?.userName} đã đặt hàng`,
      });
    } catch (error) {
      console.error("Order Creation Error: ", error);
      messageApi.open({
        type: "error",
        content: "Lỗi tạo đơn hàng!",
      });
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "image_product",
      key: "image_product",
      render: (_: any, order: any) => (
        <img
          src={order.productId.image_product}
          className="w-[70px] lg:w-[100px] lg:h-[100px]"
          alt=""
        />
      ),
    },
    {
      dataIndex: "name_product",
      key: "name_product",
      render: (_: any, order: any) => (
        <div className="lg:flex lg:items-center gap-10">
          <div>
            <h1 className="font-bold text-sm lg:text-base">
              {order?.productId?.name_product}
            </h1>
            {/* <p className="border border-stone-200 rounded my-1 lg:my-3 px-3 py-1 lg:py-2 lg:w-[220px] w-full text-xs lg:text-sm">
              Đổi trả miễn phí 15 ngày
            </p> */}
            <div className="flex justify-between md:hidden mt-2">
              <p className="text-sm lg:text-base">
                {order?.price_item?.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <p className="text-sm lg:text-base">x {order?.quantity}</p>
            </div>
          </div>
          <p className="font-bold w-28 p-0 text-xs lg:text-sm mt-2 lg:mt-0">
            Loại: {order?.color_item} - {order?.name_size}
          </p>
        </div>
      ),
    },
    {
      dataIndex: "price_product",
      key: "price_product",
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base">
          {order?.price_item?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
    {
      dataIndex: "quantity",
      key: "quantity",
      render: (_: any, order: any) => (
        <p className="hidden lg:block text-sm lg:text-base">
          {" "}
          x {order?.quantity}
        </p>
      ),
    },
    {
      dataIndex: "total_price_item",
      key: "total_price_item",
      render: (_: any, order: any) => (
        <p className="font-bold hidden lg:block text-sm lg:text-base">
          {order?.total_price_item?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          })}
        </p>
      ),
    },
  ];
  if (loadingOrder || isPending) {
    return (
      <div className="fixed z-[10] bg-[#17182177] w-screen h-screen top-0 right-0 grid place-items-center">
        <div className="animate-spin">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="max-w-[1440px] w-[95vw] mx-auto">
        {contextHolder}
        <div className="mt-20">
          <div className="mb-6">
            <div className="flex items-center gap-3 bg-[#F5F5F5] py-6">
              <img
                src="../../src/assets/Images/Logo/logo.png"
                className="w-[50px] h-[50px]"
                alt=""
              />
              <span className="h-[50px] border-black border-r-2"></span>
              <h1 className="text-2xl font-bold">Thanh Toán</h1>
            </div>
          </div>
          <form onSubmit={handleSubmit(onAddOrder)}>
            <div className="p-2 lg:py-6 lg:px-6 border rounded shadow-sm">
              <div className="flex gap-3">
                <Address />
                <p>Địa chỉ nhận hàng</p>
              </div>
              <div className="flex justify-between lg:justify-normal gap-12 flex-wrap pl-9">
                <div className="flex items-center gap-4">
                  {auth?.address.length === 0 ? (
                    "Bạn hay thêm địa chỉ trước khi thanh toán"
                  ) : (
                    <>
                      {selectedAddress === undefined ? (
                        "Bạn cần chọn địa chỉ"
                      ) : (
                        <>
                          {selectedAddress ? (
                            <div className="flex items-center gap-4">
                              <h1 className="font-bold">
                                {selectedAddress?.fullName}
                              </h1>
                              <p className="font-bold">
                                {selectedAddress?.phoneNumber}
                              </p>
                              <p>
                                {selectedAddress?.addressDetails +
                                  " - " +
                                  selectedAddress?.address}
                              </p>
                            </div>
                          ) : (
                            auth?.address?.map(
                              (item: any, index: any) =>
                                item.checked === true && (
                                  <div
                                    key={index}
                                    className="flex items-center gap-4"
                                  >
                                    <h1 className="font-bold">
                                      {item?.fullName}
                                    </h1>
                                    <p className="font-bold">
                                      {item?.phoneNumber}
                                    </p>
                                    <p>
                                      {item?.addressDetails +
                                        " - " +
                                        item?.address}
                                    </p>
                                  </div>
                                )
                            )
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                <div className="flex items-center gap-8">
                  {!selectedAddress?.checked === true ? (
                    ""
                  ) : (
                    <div className="border py-2 px-4 rounded border-black hidden lg:block">
                      Mặc định
                    </div>
                  )}
                  <div
                    className="text-blue-400 underline cursor-pointer"
                    onClick={handleAddress}
                  >
                    <span className="hidden lg:block">Thay đổi</span>
                    <span className="md:hidden block">
                      <Chevron_right />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4 rounded shadow-sm">
              <Table
                columns={columns}
                dataSource={dataSort}
                pagination={false}
              />
              <div className="flex items-center justify-end gap-8 p-6">
                <p className="text-xl font-bold text-black">
                  <p>
                    Tổng số tiền:{" "}
                    {totalPrice?.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </p>
              </div>
            </div>
            <div className="border mt-4 mb-8 rounded shadow-sm">
              <div className="border-b flex justify-between px-6 py-6">
                <p className="text-xl">Phương thức thanh toán</p>
                <div className="flex gap-8 items-center">
                  <select
                    className="border rounded p-2"
                    {...register("payment", { required: true })}
                  >
                    <option value="Thanh toán khi nhận hàng">
                      Thanh toán khi nhận hàng
                    </option>
                    <option value="VNPAY">Thanh toán qua VNPAY</option>
                    {/* <option value="MoMo">Thanh toán bằng MoMo</option> */}
                  </select>
                </div>
              </div>
              <div className="flex justify-between px-6 py-6 border-b">
                <p className="text-xl">Chọn mã giảm giá</p>

                <div>
                  <div className="flex w-full h-10">
                    <input
                      type="text"
                      placeholder="Nhập mã giảm giá"
                      className="border rounded w-full text-center"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    {selectedVoucher ? (
                      <button
                        className="w-44 bg-gray-500 text-white font-bold rounded ml-2 cursor-not-allowed"
                        disabled
                      >
                        Đã áp dụng
                      </button>
                    ) : (
                      <button
                        className="w-44 bg-blue-500 text-white font-bold rounded ml-2"
                        onClick={handleApplyDiscount}
                        type="button"
                      >
                        Áp dụng
                      </button>
                    )}
                  </div>
                  <div className="flex">
                    <Button
                      type="link"
                      onClick={showVoucherModal}
                      className="ml-12 text-lg underline mt-1"
                    >
                      Xem tất cả các voucher
                    </Button>
                    {(selectedVoucher || discountAmount > 0) && (
                      <div>
                        <button
                          className="text-blue-500 underline mt-2"
                          onClick={handleRemoveVoucher}
                        >
                          Bỏ chọn voucher
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Hiển thị danh sách voucher */}
              <div className="max-w-[1440px] w-[95vw] mx-auto">
                <Modal
                  visible={isVoucherModalVisible}
                  onCancel={handleCancel}
                  footer={null}
                  centered
                  width={1350}
                >
                  <p className="text-xl mb-5">Tất cả Voucher</p>
                  {sortedVouchers.length > 0 ? (
                    <div
                      className="flex flex-wrap gap-4 overflow-y-auto"
                      style={{ maxHeight: "600px" }}
                    >
                      {sortedVouchers.map((voucher: any) => {
                        const isAllowedUser =
                          voucher.allowedUsers.length === 0 ||
                          voucher.allowedUsers.includes(userId);
                        const isVoucherAvailable =
                          voucher.usedCount < voucher.quantity_voucher;
                        const isDisabled =
                          !isAllowedUser || !isVoucherAvailable;

                        return (
                          <div
                            key={voucher._id}
                            className={`border rounded p-6 flex-shrink-0 w-[400px] flex items-center justify-between ${
                              selectedVoucher?._id === voucher._id
                                ? "border-blue-500"
                                : "border-gray-300"
                            } ${
                              isDisabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            <div>
                              <p className="font-bold text-lg">
                                {voucher.name_voucher}
                              </p>
                              <p>
                                Hạn dùng:{" "}
                                {new Date(
                                  voucher.expirationDate
                                ).toLocaleDateString()}
                              </p>
                              <p>
                                Số lượng còn lại:{" "}
                                {voucher.quantity_voucher - voucher.usedCount}
                              </p>
                              <Button
                                onClick={() => showVoucherDetails(voucher)}
                              >
                                Xem chi tiết
                              </Button>
                            </div>
                            <button
                              className={`ml-4 px-6 py-3 bg-blue-500 text-white font-bold rounded ${
                                isDisabled ? "bg-gray-300" : ""
                              }`}
                              onClick={(e) => handleApplyVoucher(e, voucher)}
                              disabled={isDisabled}
                            >
                              {isAllowedUser
                                ? isVoucherAvailable
                                  ? "Sử dụng"
                                  : "Hết mã"
                                : "Không hợp lệ"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>Không có voucher nào khả dụng</p>
                  )}
                </Modal>

                {/* Modal chi tiết voucher */}
                <Modal
                  visible={isDetailModalVisible}
                  onCancel={handleCancelDetailsModal}
                  footer={null}
                  centered
                  width={600} // Chiều rộng tùy chỉnh
                >
                  <h2 className="text-2xl mb-3">Chi tiết voucher</h2>
                  {voucherDetails && (
                    <div>
                      <p>
                        <strong className="text-lg">Tên mã giảm giá:</strong>{" "}
                        {voucherDetails.name_voucher}
                      </p>
                      <p>
                        <strong className="text-lg">Mã giảm giá:</strong>{" "}
                        {voucherDetails.code_voucher}
                      </p>
                      <p>
                        <strong className="text-lg">Loại giảm giá:</strong>{" "}
                        {voucherDetails.discountType === "percentage"
                          ? "Giảm giá theo phần trăm(%)"
                          : " Giảm giá theo số tiền cố định (VND)"}
                      </p>
                      <p>
                        <strong className="text-lg">Giá trị giảm giá:</strong>{" "}
                        {voucherDetails.discountValue}
                        {voucherDetails.discountType === "percentage"
                          ? "%"
                          : "đ"}
                      </p>
                      <p>
                        <strong className="text-lg">Điều kiện sử dụng:</strong>{" "}
                        {voucherDetails.minimumSpend
                          ? `${voucherDetails.minimumSpend.toLocaleString(
                              "vi-VN"
                            )} đ`
                          : "Không có"}
                      </p>
                      <p>
                        <strong className="text-lg">Số lượng còn lại:</strong>{" "}
                        {voucherDetails.quantity_voucher -
                          voucherDetails.usedCount}
                      </p>
                      <p>
                        <strong className="text-lg">Thời gian bắt đầu:</strong>{" "}
                        {new Date(
                          voucherDetails.startDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong className="text-lg">Thời gian kết thúc:</strong>{" "}
                        {new Date(
                          voucherDetails.expirationDate
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        <strong className="text-lg">Mô tả:</strong>{" "}
                        {voucherDetails.description_voucher}
                      </p>

                      <p>
                        <strong className="text-lg">
                          Người dùng được phép:
                        </strong>{" "}
                        {voucherDetails.allowedUsers.length > 0
                          ? "Có giới hạn"
                          : "Tất cả"}
                      </p>
                    </div>
                  )}
                </Modal>
              </div>
              <div className="flex justify-end py-6 px-6 border-b">
                <div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Tổng tiền hàng</p>
                    <p>
                      {totalPrice?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Phí vận chuyển</p>
                    <p>0đ</p>
                  </div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Voucher giảm giá</p>
                    <p>
                      {discountAmount > 0
                        ? `-${discountAmount?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}`
                        : "0đ"}
                    </p>
                  </div>
                  <div className="border my-4 rounded shadow-sm">
                    <div className="flex items-center justify-end gap-8 p-6">
                      <p className="text-xl font-bold text-black">
                        <p>
                          Tổng số tiền:{" "}
                          {(finalAmount > 0
                            ? finalAmount
                            : totalPrice
                          )?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center py-6 px-6">
                {/* <p>
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <span className="text-blue-400">Điều khoản</span>
                </p> */}
                <button
                  className="w-[200px] py-3 bg-black text-white font-bold rounded"
                  type="submit"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </form>
          {address && <Add_Address handleAddress={handleAddress}></Add_Address>}
          {isOpen && (
            <List_Address
              auth={auth.address}
              handleTAdd={handleTAdd}
              handleAddressSelect={handleAddressSelect}
              handleAddress={handleAddress}
              selectedAddress={selectedAddress}
            ></List_Address>
          )}
        </div>
      </div>
    </>
  );
};

export default Pay;
