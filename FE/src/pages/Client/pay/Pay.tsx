import { Link } from "react-router-dom";
import { SearchIcon, CartIcon, HeartIcon, NoteIcon } from "../../../resources/svg/Icon/Icon";
const Pay = () => {
    return (
        <div className="container mx-auto max-w-[1200px]">
            <div className="mb-20">
                <div className="flex items-center bg-gray-100 h-20 p-4 mx-w-[1200px]">
                    <ul className="flex gap-2">
                        <li className="text-red-500"><a href="#">Home </a></li>
                        <li> / </li>
                        <li><a href="#">Thanh Toán</a></li>
                    </ul>
                </div>
                <div className="flex">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        <div className="col-span-1">
                            <form action="">
                                <h1 className="text-lg font-bold mb-4">Thông Tin Giao Hàng</h1>
                                <div className="mb-4">
                                    <input type="text" placeholder="Họ Và Tên" className="w-full p-3 border rounded text-sm" />
                                </div>
                                <div className="mb-4">
                                    <input type="tel" placeholder="Số Điện Thoại" className="w-full p-3 border rounded text-sm" />
                                </div>
                                <div className="mb-4">
                                    <input type="email" placeholder="Email" className="w-full p-3 border rounded text-sm" />
                                </div>
                                <div className="mb-4">
                                    <input type="text" placeholder="Địa Chỉ" className="w-full p-3 border rounded text-sm" />
                                </div>
                                <div className="mb-4">
                                    <textarea placeholder="Ghi Chú" className="w-full p-3 border rounded text-sm"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="col-span-1">
                            <div className="mb-4">
                                <h1 className="text-lg font-bold mb-4">Vận Chuyển</h1>
                                <div className="text-gray-700 w-full p-4 border rounded text-sm font-thin">
                                    Miễn Phí Vận Chuyển Cho Tất Cả Đơn Hàng
                                </div>
                            </div>
                            <div className="">
                                <h1 className="text-lg font-bold mb-2">Thanh Toán</h1>
                                <div className="w-full p-2 border rounded-t text-xs mb-2">
                                    <form action="" className="w-full">
                                        <div className="border-b mb-2  p-2 w-full">
                                            <label className="flex items-center w-full">
                                                <input type="radio" name="paymentMethod" value="vnpay" className="mr-2" />
                                                <p className="flex-1 text-sm font-thin">Thanh toán qua thẻ, ứng dụng ngân hàng VNPAY</p>
                                                <img src="/src/resources/svg/Icon/tải xuống.png" className="w-10 h-10" alt="VNPAY Icon" />
                                            </label>
                                        </div>
                                        <div className="border-b p-2 mb-2 w-full">
                                            <label className="flex items-center w-full">
                                                <input type="radio" name="paymentMethod" value="vnpay-qr" className="mr-2" />
                                                <p className="flex-1 text-sm font-thin">Thanh toán qua VNPAY-QR</p>
                                                <img src="/src/resources/svg/Icon/tải xuống.png" className="w-10 h-10" alt="VNPAY Icon" />
                                            </label>
                                        </div>
                                        <div className="mb-2 p-2 w-full">
                                            <label className="flex items-center w-full">
                                                <input type="radio" name="paymentMethod" value="cod" className="mr-2" />
                                                <p className="text-sm font-thin">Thanh toán khi nhận hàng (COD)</p>
                                            </label>
                                        </div>
                                    </form>
                                </div>






                            </div>
                        </div>
                    </div>

                    <div className="p-4 space-y-4  border rounded text-sm mt-5 mb-5">
                        <div className="product-list-wrapper">
                            <div className="flex space-x-4 p-3">
                                <div>
                                    <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
                                </div>
                                <div>
                                    <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
                                    <p className="text-gray-500">Xanh xám / 4XL</p>
                                    <p className="text-gray-500">Số Lượng: 1</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 p-3">
                                <div>
                                    <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
                                </div>
                                <div>
                                    <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
                                    <p className="text-gray-500">Xanh xám / 4XL</p>
                                    <p className="text-gray-500">Số Lượng: 1</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 p-3">
                                <div>
                                    <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
                                </div>
                                <div>
                                    <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
                                    <p className="text-gray-500">Xanh xám / 4XL</p>
                                    <p className="text-gray-500">Số Lượng: 1</p>
                                </div>
                            </div>
                            <div className="flex space-x-4 p-3">
                                <div>
                                    <img src="/../../../src/resources/images/products/90chinh-mau-nen.webp" className="w-16 h-20" alt="Product Image" />
                                </div>
                                <div>
                                    <p className="font-medium">Áo Polo Nam Pique Mắt Chim Basic Co Giãn Thoáng Khí</p>
                                    <p className="text-gray-500">Xanh xám / 4XL</p>
                                    <p className="text-gray-500">Số Lượng: 1</p>
                                </div>
                            </div>
                        </div>



                        <div className="flex space-x-2">
                            <input type="text" placeholder="Nhập mã giảm giá" className="flex-1 p-2 border rounded" />
                            <button className="px-4 py-2 bg-blue-500 text-white rounded">Áp Dụng</button>
                        </div>
                        <div>
                            <div className="grid grid-flow-col col-span-2 border border-gray-300  rounded p-2">
                                <div>
                                    <img src="/../../../src/resources/svg/Icon/th.jpg" alt="" className="w-14 h-16" />
                                </div>
                                <div className="text-center ">
                                    <p className="font-bold"> Voucher 100K cho đơn nguyên giá từ 299K </p>
                                    <p className="text-xs font-sans mb-3">*Dành riêng cho khách hàng của chương trình ZaloPay</p>
                                    <div className="flex justify-center gap-1">
                                        <p className="border border-gray-300 rounded w-32 p-1 text-xs font-bold text-gray-500">KHACHHANGMOI</p>
                                        <button className="bg-blue-950 border rounded w-20 text-white">lưu Mã</button>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-flow-col col-span-2 border border-gray-300  rounded p-2">
                                <div>
                                    <img src="/../../../src/resources/svg/Icon/th.jpg" alt="" className="w-14 h-16" />
                                </div>
                                <div className="text-center ">
                                    <p className="font-bold"> Voucher 100K cho đơn nguyên giá từ 199K </p>
                                    <p className="text-xs font-sans mb-3">*Dành riêng cho khách hàng của chương trình ZaloPay</p>
                                    <div className="flex justify-center gap-1">
                                        <p className="border border-gray-300 rounded w-32 p-1 text-xs font-bold text-gray-500">KHACHHANGMOI</p>
                                        <button className="bg-blue-950 border rounded w-20 text-white">lưu Mã</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-gray-700">Tạm Tính:</p>
                                <span className="font-medium">12.049.055đ</span>
                            </div>
                            <div className="flex justify-between">
                                <p className="text-gray-700">Phí Vận Chuyển:</p>
                                <span className="font-medium">Miễn Phí</span>
                            </div>
                            <div className="flex justify-between mt-5">
                                <p className="text-gray-700">Tổng Cộng:</p>
                                <span className="font-bold text-xl text-yellow-500">12.049.055đ</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <a href="/cart" className="text-blue-500">Quay Về Giỏ Hàng</a>
                                <button className="px-4 py-2 bg-green-500 text-white rounded">Đặt Hàng</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Pay;
