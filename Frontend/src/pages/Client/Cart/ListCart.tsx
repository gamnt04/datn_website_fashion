import { Link } from "react-router-dom";
import { SearchIcon, CartIcon, HeartIcon, NoteIcon, Minus, Plus } from "../../../resources/svg/Icon/Icon";
import './ListCart.css';
const ListCart = () => {
    return (
        <div className="container mx-auto max-w-[1200px]">
            <header className="flex items-center h-[100px]">
                <a href="#" className="w-28 h-20 mr-2 ">
                    <img
                        src="../../../src/resources/images/Logo/logo_chung.png"
                        alt="Logo"
                    />
                </a>
                <nav className="flex-grow">
                    <ul className="flex justify-center gap-10 text-base font-semibold text-[#222222]">
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                HOME
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                SHOP
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                CATEGORIES
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                BLOG
                            </a>
                        </li>
                        <li>
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                CONTACT
                            </a>
                        </li>
                        <li className="relative">
                            <a href="#" className="border-[#f68e56] hover:border-b-2">
                                PAGES
                            </a>
                            <ul className="absolute top-full left-0 hidden bg-white border rounded-sm mt-1 w-32">
                                <li>
                                    <a href="/about-us" className="block px-4 py-2 hover:bg-gray-100">About Us</a>
                                </li>
                                <li>
                                    <a href="/faqs" className="block px-4 py-2 hover:bg-gray-100">FAQs</a>
                                </li>
                                <li>
                                    <a href="/delivery" className="block px-4 py-2 hover:bg-gray-100">Delivery</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <nav className="ml-auto ">
                    <ul className="flex items-center float-right gap-10">
                        <li>
                            <a href="#">
                                <SearchIcon />
                            </a>
                        </li>
                        <li>
                            <a href="/cart">
                                <CartIcon />
                            </a>
                        </li>
                        <li>
                            <a href="/favourite">
                                <HeartIcon />
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white transition-colors duration-300 hover:text-orange-500"
                            >
                                <NoteIcon />
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
            <div>
                <div className="flex items-center bg-gray-100 h-20 p-4 mx-w-[1200px]">
                    <ul className="flex gap-2">
                        <li className="text-red-500"><a href="#">Home </a></li>
                        <li> / </li>
                        <li><a href="#">Cart</a></li>
                    </ul>
                </div>
                
                <div className="mt-4">
                    <div className="bg-white flex border rounded-sm shadow-sm text-sm uppercase tracking-wider text-black font-medium items-center">
                        <div className="px-6 py-3 text-left">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
                        </div>
                        <div className="px-6 py-3 flex-grow">
                            Sản phẩm
                        </div>
                        <div className="px-6 py-3 text-center flex-shrink-0 w-32">
                            Đơn Giá
                        </div>
                        <div className="px-6 py-3 text-center flex-shrink-0 w-36">
                            Số Lượng
                        </div>
                        <div className="px-6 py-3 text-center flex-shrink-0 w-32">
                            Số Tiền
                        </div>
                        <div className="px-6 py-3 text-center flex-shrink-0 w-32">
                            Thao Tác
                        </div>
                    </div>
                    <div className="bg-white mt-4 border mb-5 rounded-sm shadow-sm">
                        <div className="flex items-center py-4">
                            <div className="px-6">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
                            </div>
                            <div className="px-6 flex-grow mr-10">
                                <div className=" flex gap-5">
                                    <div className="w-20 h-20 ">
                                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" />
                                    </div>
                                    <div className="overflow-hidden max-w-60 max-h-14 text-sm">
                                        GUDETU Giày nam. Dép mềm mại, thoải mái, dép eva, dép đi trong phòng tắm gia đình chống trượt Dép đi trong nhà dành cho cặp đôi. Dép
                                    </div>
                                    <div className="overflow-hidden max-w-32 max-h-56">
                                        <p className="text-sm text-gray-400">Phân Loại Hàng: dép màu đen</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 flex-shrink-0 w-28">
                                <div className="text-sm text-gray-500">
                                    $10
                                </div>
                            </div>
                            <div className="px-6 flex-shrink-0 w-32 rounded-sm ">
                                <div className="text-sm flex text-center gap-3 text-gray-500">
                                    <Minus />
                                    <span>2</span>
                                    <Plus />
                                </div>
                            </div>

                            <div className="px-6 flex-shrink-0 w-32">
                                <div className="text-sm text-center text-gray-500">
                                    $20
                                </div>
                            </div>
                            <div className="px-6 flex-shrink-0 w-32">
                                <div className="text-sm text-center text-gray-500">
                                    Edit
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white mt-4 border mb-5 rounded-sm shadow-sm">
                        <div className="flex items-center py-4">
                            <div className="px-6">
                                <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
                            </div>
                            <div className="px-6 flex-grow mr-10">
                                <div className=" flex gap-5">
                                    <div className="w-20 h-20 ">
                                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" />
                                    </div>
                                    <div className="overflow-hidden max-w-60 max-h-14 text-sm">
                                        GUDETU Giày nam. Dép mềm mại, thoải mái, dép eva, dép đi trong phòng tắm gia đình chống trượt Dép đi trong nhà dành cho cặp đôi. Dép
                                    </div>
                                    <div className="overflow-hidden max-w-32 max-h-56">
                                        <p className="text-sm text-gray-400">Phân Loại Hàng: dép màu đen</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 flex-shrink-0 w-28">
                                <div className="text-sm text-gray-500">
                                    $10
                                </div>
                            </div>
                            <div className="px-6 flex-shrink-0 w-32 rounded-sm ">
                                <div className="text-sm flex text-center gap-3 text-gray-500">
                                    <Minus />
                                    <span>2</span>
                                    <Plus />
                                </div>
                            </div>

                            <div className="px-6 flex-shrink-0 w-32">
                                <div className="text-sm text-center text-gray-500">
                                    $20
                                </div>
                            </div>
                            <div className="px-6 flex-shrink-0 w-32">
                                <div className="text-sm text-center text-gray-500">
                                    Edit
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" mb-10">
                    <div className="h-20 bg-white flex border rounded-sm shadow-sm text-sm uppercase tracking-wider text-black font-medium items-center">
                        <div className="px-6 py-3 text-left">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
                        </div>
                        <div className="px-6 py-3 flex-grow text-lg">
                            Chọn Tất Cả
                        </div>
                        <div className="px-6 py-3 flex ">
                            <div className="text-lg">Tạm Tính : </div>
                            <span className="py-1 "> $10.000đ</span>
                        </div>
                        <Link to="pay">
                            <button className="px-4 py-3 mr-5 w-48 text-white font-semibold bg-amber-800 hover:bg-orange-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                                Mua Hàng
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="w-full bg-orange-400 p-5 text-center text-3xl">Hoàng Đức Trung</footer>
        </div>
    );
};

export default ListCart;
