import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { Button, Checkbox, Input, Spin } from "antd";
import { CloseOutlined, DeleteOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const Pay = () => {
    const [user] = useLocalStorage("user", {});
    const [isOpen, setIsOpen] = useState(false)
    const [address, setAddress] = useState(false)
    const userId = user?.user?._id;
    const { data: auth, isLoading } = List_Auth(userId)
    console.log(auth?.address);

    const { register, handleSubmit, setValue } = useForm()
    const { onSubmit, data } = Pay_Mutation();
    const { calculateTotalProduct, calculateTotal } = List_Cart(userId);
    if (auth && auth.address) {
        const defaultAddress = auth.address.find((item: any) => item.fullName === "admin");
        if (defaultAddress) {
            setValue("userName", defaultAddress.fullName);
            setValue("phone", defaultAddress.phoneNumber);
            setValue("email", auth.email);
            setValue("address", `${defaultAddress.addressType} - ${defaultAddress.addressDetails}`);
        }
    }
    const handleTAdd = () => {
        setAddress(!address);
        if (isOpen) setIsOpen(false); // Tắt modal "Địa chỉ của tôi" nếu đang bật
    };

    const handleAddress = () => {
        setIsOpen(!isOpen);
        if (address) setAddress(false); // Tắt modal "Địa chỉ mới" nếu đang bật
    };
    return (
        <>
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                </div>
            ) : (
                <div className="mt-20">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 bg-[#F5F5F5] py-6">
                            <img src="../../src/assets/Images/Logo/logo.png" className="w-[50px] h-[50px]" alt="" />
                            <span className="h-[50px] border-black border-r-2"></span>
                            <h1 className="text-2xl font-bold">Thanh Toán</h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-6 px-6 border rounded shadow-sm">
                            <div className="flex gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                </svg>
                                <p>Địa chỉ nhận hàng</p>
                            </div>
                            <div className="flex gap-12">
                                {auth?.address?.map((item: any, index: number) => (
                                    item.fullName === "admin" && (
                                        <div key={index} className="flex items-center gap-4">
                                            <h1 className="font-bold">{item?.fullName}</h1>
                                            <p className="font-bold">{item?.phoneNumber}</p>
                                            <p>{item?.addressType + " - " + item?.addressDetails}</p>
                                        </div>
                                    )
                                ))}
                                <div className="flex items-center gap-8">
                                    <div className="border py-2 px-4 rounded border-black">Mặc định</div>
                                    <div className="text-blue-400 underline" onClick={handleAddress}>Thay đổi</div>
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
                                    {data?.products.map((item: any) => (
                                        <tr className="*:text-center">
                                            <td className="flex items-center justify-between *:py-3 *:px-6">
                                                <div className="flex items-center gap-5">
                                                    <img src={item.image} className="w-[100px] h-[100px]" alt="" />
                                                    <div className="flex flex-col">
                                                        <p className="mb-3 font-bold text-left">{item.name}</p>
                                                        <p className="border border-stone-200 rounded-sm py-2 w-[220px]">Đổi trả miễn phí 15 ngày</p>
                                                    </div>
                                                </div>
                                                <div className="mr-12">
                                                    <p className="font-bold w-28 p-0"> Loại: {item.color} - {item.size}</p>
                                                </div>
                                            </td>
                                            <td>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <p className="font-bold">{(item.price * item.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-6 flex justify-end gap-6 border-t">
                                <div className="mr-10">
                                    <p>Voucher:</p>
                                </div>
                                <div className="flex items-center gap-5">
                                    <p className="py-1 px-3 border-stone-200 border rounded-sm">-50K</p>
                                    <div className="text-blue-400 underline">Chọn Voucher Khác</div>
                                </div>
                            </div>
                            <div className="flex justify-between gap-16 border-t-2 border-b">
                                <div className="p-6">
                                    <label className="mr-2">Lời nhắn:</label>
                                    <input type="text" placeholder="Lưu ý cho người bán" className="border w-[300px] p-2 outline-none border-stone-200 rounded" />
                                </div>
                                <div className="flex gap-16 border-l-2 py-6 pl-24 pr-6">
                                    <p>Đơn vị vận chuyển:</p>
                                    <div>
                                        <div className="flex justify-between">
                                            <p>Nhanh</p>
                                            <div className="text-blue-400 underline">Thay đổi</div>
                                        </div>
                                        <span className="text-sm">Nhận hàng vào 9 Tháng 7 - 10 Tháng 7</span>
                                    </div>
                                    <p>₫32.800</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-8 p-6">
                                <p>Tổng số tiền ( {calculateTotalProduct()} sản phẩm):</p>
                                <p className="text-xl font-bold text-black">{calculateTotal().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
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
                                        <option value="Thanh toán khi nhận hàng">Thanh toán khi nhận hàng</option>
                                        <option value="VNPAY">Thanh toán qua VNPAY</option>
                                        <option value="MoMo">Thanh toán bằng MoMo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end py-6 px-6 border-b">
                                <div>
                                    <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng tiền hàng</p>
                                        <p>{calculateTotal().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                    <div className="flex justify-between py-3 gap-16">
                                        <p>Phí vận chuyển</p>
                                        <p>₫32.800</p>
                                    </div>
                                    {/* <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng cộng Voucher giảm giá:</p>
                                        <p>-₫50.000</p>
                                    </div> */}
                                    <div className="flex justify-between py-3 gap-16">
                                        <p>Tổng thanh toán</p>
                                        <p className="text-xl font-bold text-black">{(calculateTotal() + 32800).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center py-6 px-6">
                                <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span className="text-blue-400">Điều khoản</span></p>
                                <button className="w-[200px] py-3 bg-black text-white font-bold rounded" type="submit">Đặt hàng</button>

                            </div>
                        </div>
                    </form>
                    {address && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                            <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[500px]">
                                <h1 className="py-3 text-center font-medium">Địa chỉ mới</h1>
                                <form>
                                    <div className="w-full border px-2 py-2 rounded flex gap-3 my-3">
                                        <Input className="w-full border-none focus:ring-0" placeholder="Họ và tên"></Input>
                                        <Input className="w-full border-none focus:ring-0" placeholder="Số điện thoại"></Input>
                                    </div>
                                    <div className="my-3 px-2 py-2 border rounded">
                                        <Input className="w-full border-none focus:ring-0" placeholder="Tỉnh/Thành phố, Quận/Huyện, Phường/Xã"></Input>
                                    </div>
                                    <div className="my-3 px-2 py-2 border rounded">
                                        <Input className="w-full border-none focus:ring-0" placeholder="Địa chỉ cụ thể"></Input>
                                    </div>
                                    <div className="my-3 ">
                                        <p>Loại địa chỉ:</p>
                                        <div className="flex justify-between gap-4 border rounded px-3 py-2 my-2  *:w-full">
                                            <button type="button" className="border-r-2">Nhà riêng</button>
                                            <button type="button">Văn phòng</button>
                                        </div>
                                    </div>
                                    <div className="my-3 flex items-center gap-3">
                                        <Checkbox>Đặt làm mặc định</Checkbox>
                                    </div>
                                    <div className="flex justify-center pt-5 w-full rounded">
                                        <button
                                            type="submit"
                                            className="bg-black text-white px-4 py-3 rounded"
                                        >
                                            Hoàn Thành
                                        </button>
                                    </div>
                                </form>
                                <Button
                                    onClick={handleAddress}
                                    className="hover:bg-slate-100 hover:rounded-full hover:border-2 w-8 h-8 border-0 absolute top-5 right-5 rounded px-2 py-2"
                                >
                                    <CloseOutlined />
                                </Button>
                            </div>
                        </div >
                    )}
                    {
                        isOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                                <div className="bg-white p-5 border rounded relative w-[400px] lg:w-[600px] max-h-[600px] overflow-auto hidden_scroll_x">
                                    <h1 className="py-3 text-center text-xl font-medium">Địa chỉ của tôi</h1>
                                    <div>
                                        <div className="px-5 py-4">
                                            <div className="flex justify-between">
                                                <h2 className="py-2">Địa chỉ</h2>
                                                <Button className="w-9 h-9" onClick={handleTAdd}>
                                                    <PlusOutlined />
                                                </Button>
                                            </div>
                                            {auth?.address?.map((item: any, index: number) => (
                                                <div className="flex justify-between items-center my-5 border-b pb-6" key={index}>
                                                    <div className="py-1">
                                                        <h1>
                                                            <span className="font-bold">{item.fullName}</span>
                                                            <span className="px-2 text-gray-400">|</span>
                                                            <span className="text-gray-400">{item.phoneNumber}</span>
                                                        </h1>
                                                        <p className="text-gray-400 py-2">{item.addressType}</p>
                                                        <p className="text-gray-400">{item.addressDetails}</p>
                                                        <div className="flex gap-3 mt-3">
                                                            <Button className="py-5">
                                                                Mặc định
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <div className="hidden lg:block">
                                                            <div className="flex flex-col gap-2 text-blue-400 py-2">
                                                                <Button className="w-9 h-9">
                                                                    <EditOutlined />
                                                                </Button>
                                                                <Button className="w-9 h-9">
                                                                    <DeleteOutlined />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="block lg:hidden">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth="1.5"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleAddress}
                                        className="hover:bg-slate-100 hover:rounded-full hover:border-2 w-8 h-8 border-0 absolute top-5 right-5 rounded px-2 py-2"
                                    >
                                        <CloseOutlined />
                                    </Button>

                                </div>
                            </div>
                        )
                    }
                </div >

            )}
        </>
    );
};

export default Pay;
