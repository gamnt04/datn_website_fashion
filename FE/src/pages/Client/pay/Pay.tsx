import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { Spin } from "antd";
import { LoadingOutlined, } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Add_Address, List_Address } from "../../../components/common/Client/_component/Address";
import { Address } from "../../../components/common/Client/_component/Icons";
import { useNavigate } from "react-router-dom";

const Pay = () => {
  const routing = useNavigate();
  const [user] = useLocalStorage("user", {});
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState(false);
  const userId = user?.user?._id;
  const { data: auth, isLoading } = List_Auth(userId);
  const [selectedAddress, setSelectedAddress]: any = useState(null)
  const { register, handleSubmit, setValue } = useForm();
  const { onSubmit, contextHolder } = Pay_Mutation();
  const data_sessionStorage = sessionStorage.getItem('item_order');
  let data: any;
    if (data_sessionStorage) {
      data = JSON.parse(data_sessionStorage);
    }
    else {
      routing('/')
    }
  useEffect(() => {
    if (auth && auth.address) {
      const defaultAddress = auth.address.find((item: any) => item.fullName === "admin");
      const address = selectedAddress || defaultAddress;
      if (address) {
        setSelectedAddress(address);
        setValue("userName", address.fullName);
        setValue("phone", address.phoneNumber);
        setValue("email", auth.email);
        setValue("address", `${address.addressType} - ${address.addressDetails}`);
      }
    }
  }, [auth, selectedAddress, setValue]);
  const handleTAdd = () => {
    setAddress(!address);
    if (isOpen) setIsOpen(false);
  };

  const handleAddress = () => {
    setIsOpen(!isOpen);
    if (address) setAddress(false);
  };
  const handleAddressSelect = (address: any) => {
    setSelectedAddress(address);
    setIsOpen(false);
  };

  // add order 
  function onAddOrder(data_form: any) {
    const item_order = {
      userId: userId,
      items: data?.data_order,
      customerInfo: data_form,
      totalPrice: data?.totalPrice
    }
    onSubmit(item_order);
  }

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
      ) : (
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
            <div className="py-6 px-6 border rounded shadow-sm">
              <div className="flex gap-3">
                <Address />
                <p>Địa chỉ nhận hàng</p>
              </div>
              <div className="flex gap-12">
                {selectedAddress ? (
                  <div className="flex items-center gap-4">
                    <h1 className="font-bold">{selectedAddress.fullName}</h1>
                    <p className="font-bold">{selectedAddress.phoneNumber}</p>
                    <p>
                      {selectedAddress.addressType + " - " + selectedAddress.addressDetails}
                    </p>
                  </div>
                ) : (
                  auth?.address?.map(
                    (item: any, index: any) =>
                      item.fullName === "admin" && (
                        <div key={index} className="flex items-center gap-4">
                          <h1 className="font-bold">{item?.fullName}</h1>
                          <p className="font-bold">{item?.phoneNumber}</p>
                          <p>
                            {item?.addressType + " - " + item?.addressDetails}
                          </p>
                        </div>
                      )
                  )
                )}
                <div className="flex items-center gap-8">
                  <div className="border py-2 px-4 rounded border-black">
                    Mặc định
                  </div>
                  <div
                    className="text-blue-400 underline cursor-pointer"
                    onClick={handleAddress}
                  >
                    Thay đổi
                  </div>
                </div>
              </div>
            </div>
            <div className="border my-4 rounded shadow-sm">
              <table className="w-full">
                <thead className=" *:py-3 *:px-6 *:font-normal">
                  <th className="w-[800px] text-left">Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                </thead>
                <tbody>
                  {data?.data_order?.map((item: any) => (
                    <tr className="*:text-center">
                      <td className="flex items-center justify-between *:py-3 *:px-6">
                        <div className="flex items-center gap-5">
                          <img
                            src={item?.productId?.image_product}
                            className="w-[100px] h-[100px]"
                            alt=""
                          />
                          <div className="flex flex-col">
                            <p className="mb-3 font-bold text-left">
                              {item?.productId?.name_product}
                            </p>
                            <p className="border border-stone-200 rounded py-2 w-[220px]">
                              Đổi trả miễn phí 15 ngày
                            </p>
                          </div>
                        </div>
                        <div className="mr-12">
                          <p className="font-bold w-28 p-0">
                            Loại: {item?.color_item} - {item?.name_size}
                          </p>
                        </div>
                      </td>
                      <td>
                        {item?.productId?.price_product.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td>{item?.quantity}</td>
                      <td>
                        <p className="font-bold">
                          {(item?.total_price_item)?.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* <div className="p-6 flex justify-end gap-6 border-t">
                <div className="mr-10">
                  <p>Voucher:</p>
                </div>
                <div className="flex items-center gap-5">
                  <p className="py-1 px-3 border-stone-200 border rounded-sm">
                    -50K
                  </p>
                  <div className="text-blue-400 underline">
                    Chọn Voucher Khác
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-16 border-t-2 border-b">
                <div className="p-6">
                  <label className="mr-2">Lời nhắn:</label>
                  <input
                    type="text"
                    placeholder="Lưu ý cho người bán"
                    className="border w-[300px] p-2 outline-none border-stone-200 rounded"
                  />
                </div>
                <div className="flex gap-16 border-l-2 py-6 pl-24 pr-6">
                  <p>Đơn vị vận chuyển:</p>
                  <div>
                    <div className="flex justify-between">
                      <p>Nhanh</p>
                      <div className="text-blue-400 underline">Thay đổi</div>
                    </div>
                    <span className="text-sm">
                      Nhận hàng vào 9 Tháng 7 - 10 Tháng 7
                    </span>
                  </div>
                  <p>₫32.800</p>
                </div>
              </div> */}
              <div className="flex items-center justify-end gap-8 p-6">
                {/* <p>Tổng số tiền ( {calculateTotalProduct()} sản phẩm):</p> */}
                <p className="text-xl font-bold text-black">
                  {data?.totalPrice?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
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
                    <option value="MoMo">Thanh toán bằng MoMo</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end py-6 px-6 border-b">
                <div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Tổng tiền hàng</p>
                    <p>
                      {data?.totalPrice?.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between py-3 gap-16">
                    <p>Phí vận chuyển</p>
                    <p>0đ</p>
                  </div>
                  {/* <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng cộng Voucher giảm giá:</p>
                                        <p>-₫50.000</p>
                                    </div> */}
                  <div className="flex justify-between py-3 gap-16">
                    <p>Tổng thanh toán</p>
                    <p className="text-xl font-bold text-black">{(data?.totalPrice)?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center py-6 px-6">
                <p>
                  Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{" "}
                  <span className="text-blue-400">Điều khoản</span>
                </p>
                <button
                  className="w-[200px] py-3 bg-black text-white font-bold rounded"
                  type="submit"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </form>
          {address && (
            <Add_Address handleAddress={handleAddress}></Add_Address>
          )}
          {isOpen && (
            <List_Address auth={auth}
              handleTAdd={handleTAdd}
              handleAddressSelect={handleAddressSelect}
              handleAddress={handleAddress}
            ></List_Address>
          )}
        </div>
      )}
    </>
  );
};

export default Pay;
