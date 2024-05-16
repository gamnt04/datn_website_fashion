import { SearchIcon, CartIcon, HeartIcon, NoteIcon } from "../../../resources/svg/Icon/Icon";
import './style.css';
const Favourite = () => {
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
                        <li><a href="#">Wishlist</a></li>
                    </ul>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
                <div className="">
                    <div className="relative w-full max-h-72 border rounded-sm overflow-hidden img-hover-scale">
                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <HeartIcon />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-lg font-thin">Dép Màu Đen</p>
                        <p className="font-sans">Thượng Đình</p>
                        <span className="text-lg font-sans">18.800.000 VND</span>
                        <div className="text-center mt-2">
                            <label className="inline-block cursor-pointer mr-2">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                            <label className="inline-block cursor-pointer">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-full max-h-72 border rounded-sm overflow-hidden img-hover-scale">
                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <HeartIcon />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-lg font-thin">Dép Màu Đen</p>
                        <p className="font-sans">Thượng Đình</p>
                        <span className="text-lg font-sans">18.800.000 VND</span>
                        <div className="text-center mt-2">
                            <label className="inline-block cursor-pointer mr-2">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                            <label className="inline-block cursor-pointer">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-full max-h-72 border rounded-sm overflow-hidden img-hover-scale">
                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <HeartIcon />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-lg font-thin">Dép Màu Đen</p>
                        <p className="font-sans">Thượng Đình</p>
                        <span className="text-lg font-sans">18.800.000 VND</span>
                        <div className="text-center mt-2">
                            <label className="inline-block cursor-pointer mr-2">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                            <label className="inline-block cursor-pointer">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-full max-h-72 border rounded-sm overflow-hidden img-hover-scale">
                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <HeartIcon />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-lg font-thin">Dép Màu Đen</p>
                        <p className="font-sans">Thượng Đình</p>
                        <span className="text-lg font-sans">18.800.000 VND</span>
                        <div className="text-center mt-2">
                            <label className="inline-block cursor-pointer mr-2">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                            <label className="inline-block cursor-pointer">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="relative w-full max-h-72 border rounded-sm overflow-hidden img-hover-scale">
                        <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 right-0 p-2">
                            <HeartIcon />
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <p className="text-lg font-thin">Dép Màu Đen</p>
                        <p className="font-sans">Thượng Đình</p>
                        <span className="text-lg font-sans">18.800.000 VND</span>
                        <div className="text-center mt-2">
                            <label className="inline-block cursor-pointer mr-2">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                            <label className="inline-block cursor-pointer">
                                {/* <input type="checkbox" className="absolute opacity-0 cursor-pointer" /> */}
                                <img src="../../../src/resources/images/products/90chinh-mau-nen.webp" alt="" className="w-7 h-7 border rounded-full overflow-hidden hover:border-orange-500" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Favourite;