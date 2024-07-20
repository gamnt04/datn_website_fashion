import { useForm } from "react-hook-form";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";
import { List_Cart } from "../../../common/hooks/Cart/querry_Cart";
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { List_Auth } from "../../../common/hooks/Auth/querry_Auth";
import { useState } from "react";

const Pay = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data: auth, isLoading } = List_Auth(userId)
    const { register, handleSubmit, setValue } = useForm()
    const { onSubmit, data } = Pay_Mutation();
    const { calculateTotalProduct, calculateTotal } = List_Cart(userId);
    const [showOptions, setShowOptions] = useState(false);

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    }
    if (auth && auth.address) {
        const defaultAddress = auth.address.find((item: any) => item.fullName === "admin");
        if (defaultAddress) {
            setValue("userName", defaultAddress.fullName);
            setValue("phone", defaultAddress.phoneNumber);
            setValue("email", auth.email);
            setValue("address", `${defaultAddress.addressType} - ${defaultAddress.addressDetails}`);
        }
    }
    if (isLoading) return <p>Loading...</p>
    return (
        <>
            <div className="mt-20">
                <div className="mb-6">
                    <div className="flex items-center gap-3 bg-[#F5F5F5] py-6">
                        <img src="../../src/assets/Images/Logo/logo.png" className="w-[50px] h-[50px]" alt="" />
                        <span className="h-[50px] border-black border-r-2"></span>
                        <h1 className="text-2xl font-bold">Thanh Toán</h1>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="py-6 px-6 border rounded-md shadow-sm">
                        <div className="flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
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
                                <div className="border py-2 px-4 rounded-sm border-black">Mặc định</div>
                                <div className="text-blue-400 underline">Thay đổi</div>
                            </div>
                        </div>
                    </div>
                    <div className="border my-4 rounded-md shadow-sm">
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
                                                <p>Xám - XL</p>
                                            </div>
                                        </td>
                                        <td>{item.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                        <td>{item.quantity}</td>
                                        <td>{(item.price * item.quantity).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
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
                                <input type="text" placeholder="Lưu ý cho người bán" className="border w-[300px] p-2 outline-none border-stone-200 rounded-sm " />
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
                    <div className="border mt-4 mb-8 rounded-md shadow-sm">

                        <div className="border-b flex justify-between px-6 py-6">
                            <p className="text-xl">Phương thức thanh toán</p>
                            <div className="flex gap-8">
                                <p>Phương thức thanh toán</p>
                                <div
                                    className="text-blue-400 underline"
                                    onClick={toggleOptions}
                                >
                                    Thay đổi
                                </div>
                            </div>
                            {showOptions && (
                                <div className="mt-4">
                                    <label className="flex items-center w-full">
                                        <input type="radio" value="Thanh toán tiền mặt" className="mr-2" defaultChecked {...register("payment", { required: true })} />
                                        <p className="text-sm">Thanh toán khi nhận hàng (COD)</p>
                                    </label>
                                    <label className="flex items-center w-full">
                                        <input type="radio" value="Thanh toán tiền mặt" className="mr-2" {...register("payment", { required: true })} />
                                        <p className="flex-1 text-sm">Thanh toán qua thẻ, ứng dụng ngân hàng VNPAY</p>
                                    </label>
                                    <label className="flex items-center w-full">
                                        <input type="radio" value="Thanh toán tiền mặt" className="mr-2" {...register("payment", { required: true })} />
                                        <p className="text-sm">Thanh toán khi nhận hàng (COD)</p>
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end py-6 px-6 border-b">
                            <div>
                                <div className="flex justify-between py-3 gap-16">
                                    <p>Tổng tiền hàng</p>
                                    <p>₫649.000</p>
                                </div>
                                <div className="flex justify-between py-3 gap-16">
                                    <p>Phí vận chuyển</p>
                                    <p>₫32.800</p>
                                </div>
                                <div className="flex justify-between py-3 gap-16">
                                    <p>Tổng cộng Voucher giảm giá:</p>
                                    <p>-₫50.000</p>
                                </div>
                                <div className="flex justify-between py-3 gap-16">
                                    <p>Tổng thanh toán</p>
                                    <p className="text-xl font-bold text-black">{calculateTotal().toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-6 px-6">
                            <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span className="text-blue-400">Điều khoản</span></p>
                            <button className="w-[200px] py-3 bg-black text-white font-bold rounded-md" type="submit">Đặt hàng</button>

                        </div>

                    </div>
                </form>
            </div >
        </>
    );
};

export default Pay;
