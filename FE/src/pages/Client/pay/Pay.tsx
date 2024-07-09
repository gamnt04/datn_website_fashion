import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { paySchema } from "../../../common/validations/pay/Pay";
import { Pay_Mutation } from "../../../common/hooks/Pay/mutation_Pay";


const Pay = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(paySchema),
        defaultValues: {
            userName: "",
            phone: "",
            email: "",
            address: "",
            payment: "vnpay"
        }
    }
    )
    // const { onSubmit, data, calcuateTotal } = Pay_Mutation();
    return (
        // <div className="max-w-[1400px] mt-4">
        //     <div className="mb-20">
        //         <div className="flex items-center bg-gray-100 h-20 p-4 mx-w-[1200px]">
        //             <ul className="flex gap-2">
        //                 <li className="text-red-500"><a href="#">Home </a></li>
        //                 <li> / </li>
        //                 <li><a href="#">Thanh Toán</a></li>
        //             </ul>
        //         </div>

        //         <form action="" onSubmit={handleSubmit(onSubmit)} className="lg:flex flex-row">
        //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 w-full basis-4/6">
        //                 <div className="col-span-1">
        //                     <h1 className="text-lg font-bold mb-4">Thông Tin Khach Hàng</h1>
        //                     <div className="mb-4">
        //                         <input type="text" placeholder="Họ Và Tên" className="w-full p-3 border rounded text-sm" {...register("userName", { required: true })} />
        //                         {errors.userName && (
        //                             <p className="text-start mt-4 text-sm text-red-400">
        //                                 {errors.userName.message}
        //                             </p>
        //                         )}
        //                     </div>
        //                     <div className="mb-4">
        //                         <input type="tel" placeholder="Số Điện Thoại" className="w-full p-3 border rounded text-sm" {...register("phone", { required: true })} />
        //                         {errors.phone && (
        //                             <p className="text-start mt-4 text-sm text-red-400">
        //                                 {errors.phone.message}
        //                             </p>
        //                         )}
        //                     </div>
        //                     <div className="mb-4">
        //                         <input type="email" placeholder="Email" className="w-full p-3 border rounded text-sm" {...register("email", { required: true })} />
        //                         {errors.email && (
        //                             <p className="text-start mt-4 text-sm text-red-400">
        //                                 {errors.email.message}
        //                             </p>
        //                         )}
        //                     </div>
        //                     <div className="mb-4">
        //                         <input type="text" placeholder="Địa Chỉ" className="w-full p-3 border rounded text-sm" {...register("address", { required: true })} />
        //                         {errors.address && (
        //                             <p className="text-start mt-4 text-sm text-red-400">
        //                                 {errors.address.message}
        //                             </p>
        //                         )}
        //                     </div>
        //                     {/* <div className="mb-4">
        //                         <textarea placeholder="Ghi Chú" className="w-full p-3 border rounded text-sm"></textarea>
        //                     </div> */}
        //                 </div>
        //                 <div className="col-span-1">
        //                     <div className="mb-4">
        //                         <h1 className="text-lg font-bold mb-4">Vận Chuyển</h1>
        //                         <select className="text-gray-700 w-full p-4 border rounded text-sm">
        //                             <option value="">Miễn Phí Vận Chuyển</option>
        //                             <option value="">Giao Hang Hoa Toc</option>
        //                             <option value="">Giao Hang Tiet Kiem</option>
        //                         </select>
        //                     </div>
        //                     <div className="">
        //                         <h1 className="text-lg font-bold mb-2">Thanh Toán</h1>
        //                         <div className="w-full p-2 border rounded-t text-xs mb-2">
        //                             <div className="w-full">
        //                                 {/* <select className="text-gray-700 w-full p-4 rounded text-sm">
        //                                     <option value="">Thanh toán khi nhận hàng (COD)</option>
        //                                     <option value="">Thanh toán qua thẻ, ứng dụng ngân hàng VNPAY</option>
        //                                     <option value="">Thanh toán qua VNPAY-QR</option>

        //                                 </select> */}
        //                                 <div className="border-b mb-2  p-2 w-full">
        //                                     <label className="flex items-center w-full">
        //                                         <input type="radio" value="vnpay" className="mr-2" defaultChecked {...register("payment", { required: true })} />
        //                                         <p className="flex-1 text-sm">Thanh toán qua thẻ, ứng dụng ngân hàng VNPAY</p>
        //                                         <img src="/src/resources/svg/Icon/tải xuống.png" className="w-10 h-10" alt="VNPAY Icon" />
        //                                     </label>
        //                                 </div>
        //                                 <div className="border-b p-2 mb-2 w-full">
        //                                     <label className="flex items-center w-full">
        //                                         <input type="radio" value="vnpay-qr" className="mr-2" {...register("payment", { required: true })} />
        //                                         <p className="flex-1 text-sm">Thanh toán qua VNPAY-QR</p>
        //                                         <img src="/src/resources/svg/Icon/tải xuống.png" className="w-10 h-10" alt="VNPAY Icon" />
        //                                     </label>
        //                                 </div>
        //                                 <div className="mb-2 p-2 w-full">
        //                                     <label className="flex items-center w-full">
        //                                         <input type="radio" value="Thanh toán tiền mặt" className="mr-2" {...register("payment", { required: true })} />
        //                                         <p className="text-sm">Thanh toán khi nhận hàng (COD)</p>
        //                                     </label>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className=" basis-2/5 p-4 space-y-4  w-full border rounded text-sm mt-5 mb-5">
        //                 <div className="product-list-wrapper">
        //                     {data?.products.map((item: any, index: number) => (
        //                         <div className="flex space-x-4 p-3" key={index}>
        //                             <div>
        //                                 <img src={item.image} className="w-16 h-20" alt="Product Image" />
        //                             </div>
        //                             <div>
        //                                 <p className="font-medium">{item.name}</p>
        //                                 {/* <p className="text-gray-500">{item.color} / {item.size}</p> */}
        //                                 <p className="text-gray-500">Xanh xám / 4XL</p>
        //                                 <p className="text-gray-500">Số Lượng: {item.quantity}</p>
        //                             </div>
        //                         </div>
        //                     ))}

        //                     {/* <div className="flex space-x-4 p-3">
        //                         <div>
        //                             <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
        //                         </div>
        //                         <div>
        //                             <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
        //                             <p className="text-gray-500">Xanh xám / 4XL</p>
        //                             <p className="text-gray-500">Số Lượng: 1</p>
        //                         </div>
        //                     </div> */}
        //                     {/* <div className="flex space-x-4 p-3">
        //                         <div>
        //                             <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
        //                         </div>
        //                         <div>
        //                             <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
        //                             <p className="text-gray-500">Xanh xám / 4XL</p>
        //                             <p className="text-gray-500">Số Lượng: 1</p>
        //                         </div>
        //                     </div>
        //                     <div className="flex space-x-4 p-3">
        //                         <div>
        //                             <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
        //                         </div>
        //                         <div>
        //                             <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
        //                             <p className="text-gray-500">Xanh xám / 4XL</p>
        //                             <p className="text-gray-500">Số Lượng: 1</p>
        //                         </div>
        //                     </div>
        //                     <div className="flex space-x-4 p-3">
        //                         <div>
        //                             <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
        //                         </div>
        //                         <div>
        //                             <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
        //                             <p className="text-gray-500">Xanh xám / 4XL</p>
        //                             <p className="text-gray-500">Số Lượng: 1</p>
        //                         </div>
        //                     </div> */}
        //                 </div>



        //                 <div className="flex space-x-2">
        //                     <input type="text" placeholder="Nhập mã giảm giá" className="flex-1 p-2 border rounded" />
        //                     <button className="px-4 py-2 bg-blue-500 text-white rounded">Áp Dụng</button>
        //                 </div>
        //                 <div>
        //                     <div className="grid grid-flow-col col-span-2 border border-gray-300  rounded p-2">
        //                         <div>
        //                             <img src="/../../../src/resources/svg/Icon/th.jpg" alt="" className="w-14 h-16" />
        //                         </div>
        //                         <div className="text-center ">
        //                             <p className="font-bold"> Voucher 100K cho đơn nguyên giá từ 299K </p>
        //                             <p className="text-xs font-sans mb-3">*Dành riêng cho khách hàng của chương trình ZaloPay</p>
        //                             <div className="flex justify-center gap-1">
        //                                 <p className="border border-gray-300 rounded w-32 p-1 text-xs font-bold text-gray-500">KHACHHANGMOI</p>
        //                                 <button className="bg-blue-950 border rounded w-20 text-white">lưu Mã</button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="grid grid-flow-col col-span-2 border border-gray-300  rounded p-2">
        //                         <div>
        //                             <img src="/../../../src/resources/svg/Icon/th.jpg" alt="" className="w-14 h-16" />
        //                         </div>
        //                         <div className="text-center ">
        //                             <p className="font-bold"> Voucher 100K cho đơn nguyên giá từ 199K </p>
        //                             <p className="text-xs font-sans mb-3">*Dành riêng cho khách hàng của chương trình ZaloPay</p>
        //                             <div className="flex justify-center gap-1">
        //                                 <p className="border border-gray-300 rounded w-32 p-1 text-xs font-bold text-gray-500">KHACHHANGMOI</p>
        //                                 <button className="bg-blue-950 border rounded w-20 text-white">lưu Mã</button>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <div className="space-y-2">
        //                     <div className="flex justify-between">
        //                         <p className="text-gray-700">Tạm Tính:</p>
        //                         <span className="font-medium">12.049.055đ</span>
        //                     </div>
        //                     <div className="flex justify-between">
        //                         <p className="text-gray-700">Phí Vận Chuyển:</p>
        //                         <span className="font-medium">Miễn Phí</span>
        //                     </div>
        //                     <div className="flex justify-between mt-5">
        //                         <p className="text-gray-700">Tổng Cộng:</p>
        //                         <span className="font-bold text-xl text-yellow-500">{calcuateTotal()}</span>
        //                     </div>
        //                     <div className="flex justify-between items-center">
        //                         <Link to="/cart" className="text-blue-500">Quay Về Giỏ Hàng</Link>
        //                         <button className="px-4 py-2 bg-green-500 text-white rounded" type="submit">Đặt Hàng</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </form>



        //     </div >
        // </div >
        <>
            <div className=" mt-28">
                <div className="py-6 px-6 border">
                    <div className="flex gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <p>Địa chỉ nhận hàng</p>
                    </div>
                    <div className="flex gap-12">
                        <div className="flex items-center gap-4">
                            <h1 className="font-bold">Dương Hải Nam</h1>
                            <p className="font-bold">0357219726</p>
                            <p>Thôn Nà Cuối, Xã Đồng Ý, Huyện Bắc Sơn, Lạng Sơn</p>
                        </div>
                        <div className="flex gap-6">
                            <button className="border py-2 px-4">Mặc định</button>
                            <button className="text-blue-400 underline">Thay đổi</button>
                        </div>
                    </div>
                </div>
                <div className="border my-4">
                    <table className="w-full">
                        <thead className=" *:text-left *:py-3 *:px-6">
                            <th className="w-[800px]">Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="flex items-center justify-between *:py-3 *:px-6">
                                    <div className="flex items-center gap-5">
                                        <img src="https://picsum.photos/300/300" className="w-[100px]" alt="" />
                                        <div className="flex flex-col">
                                            <p className="mb-3 font-bold">PRODUCTS 1</p>
                                            <p className="border py-2 px-4">Đổi trả miễn phí 15 ngày</p>
                                        </div>
                                    </div>
                                    <div className="mr-12">
                                        <p>Xám - XL</p>
                                    </div>
                                </td>
                                <td>200.000 VND</td>
                                <td>1</td>
                                <td>200.000 VND</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="p-6 flex justify-end gap-6 border-t">
                        <div className="mr-60">
                            <p>Voucher của Shop </p>
                        </div>
                        <div className="flex items-center gap-5">
                            <p className="py-1 px-3 border">-50K</p>
                            <button className="text-blue-400 underline">Chọn Voucher Khác</button>
                        </div>
                    </div>
                    <div className="flex gap-16 border-t-2 border-b p-6">
                        <p>Đơn vị vận chuyển:</p>
                        <div>
                            <div className="flex justify-between">
                                <p>Nhanh</p>
                                <button className="text-blue-400 underline">Thay đổi</button>
                            </div>
                            <span>Nhận hàng vào 9 Tháng 7 - 10 Tháng 7</span>
                        </div>
                        <p>₫32.800</p>
                    </div>
                    <div className="flex items-center justify-end gap-8 p-6">
                        <p>Tổng số tiền ( 1 sản phẩm):</p>
                        <p className="text-xl text-yellow-500">₫631.800</p>
                    </div>
                </div>
                <div className="border my-4">
                    <div className="border-b flex justify-between px-6 py-6">
                        <p className="text-xl">Phương thức thanh toán</p>
                        <div className="flex gap-8">
                            <p className="">Phương thức thanh toán</p>
                            <button className="text-blue-400 underline">Thay đổi</button>
                        </div>
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
                                <p className="text-yellow-500 text-xl">₫631.800</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center py-6 px-6">
                        <p>Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo <span className="text-blue-400">Điều khoản</span></p>
                        <button className="w-[200px] py-4 bg-black text-white font-bold">Đặt hàng</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Pay;
