import { SearchIcon, CartIcon, HeartIcon, NoteIcon } from "../../../../resources/svg/Icon/Icon";
import './style.css'
const Delivery = () => {
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
                                    <a href="/delivey" className="block px-4 py-2 hover:bg-gray-100">Delivery</a>
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
                        <li><a href="#">Delivery</a></li>
                    </ul>
                </div>
                <div className="p-5 ">
                    <h1 className="text-2xl text-pretty font-semibold font_text ">Shipments and returns</h1>
                    <h2 className="text-xl font_text">Your pack shipment</h2>
                    <div className="*:small-text *:text-gray-500 font_text">
                        <nav className=" leading-loose">
                            Packages are generally dispatched within 2 days after receipt of payment and are shipped via UPS with tracking and drop-off without signature. If you prefer delivery by UPS Extra with required signature, an additional cost will be applied, so please contact us before choosing this method. Whichever shipment choice you make, we will provide you with a link to track your package online.
                        </nav>
                        <nav className=" leading-loose">
                            Shipping fees include handling and packing fees as well as postage costs. Handling fees are fixed, whereas transport fees vary according to total weight of the shipment. We advise you to group your items in one order. We cannot group two distinct orders placed separately, and shipping fees will apply to each of them. Your package will be dispatched at your own risk, but special care is taken to protect fragile objects.
                        </nav>
                        <nav className=" leading-loose">
                            Boxes are amply sized and your items are well-protected.
                        </nav>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Delivery;
