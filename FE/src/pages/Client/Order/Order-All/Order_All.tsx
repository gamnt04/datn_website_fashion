import { useState } from 'react'
import Canceled from '../Canceled/Canceled';
import Complete from '../Complete/Complete';
import RefundRetunr from '../RefundRetunr/RefundRetunr';
import WaitingForDelivery from '../WaitingForDelivery/WaitingForDelivery';
import Waitforconfirmation from '../Waitforconfirmation/Waitforconfirmation';
import WaitingForGoods from '../WaitingForGoods/WaitingForGoods';

const Order_All = () => {
    const [activeMenu, setActiveMenu] = useState('Chờ Xác Nhận');

    const handleMenuClick = (menu: any) => {
        setActiveMenu(menu);
    };
    return (
        <>
            <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs shadow-lg">
                {['Chờ Xác Nhận', 'Chờ Lấy Hàng', 'Chờ Giao Hàng', 'Hoàn Thành', 'Đã Hủy', 'Trả Hàng / Hoàn Tiền'].map((menu) => (
                    <li
                        key={menu}
                        className={`px-3 py-3 hover:border-b-2 hover:border-yellow-400 ${activeMenu === menu ? 'border-b-2 border-yellow-400' : ''}`}
                        onClick={() => handleMenuClick(menu)}
                    >
                        <a href="#">{menu}</a>
                    </li>
                ))}
            </ul>
            <div className="flex items-center gap-3 py-3 px-3 my-4 bg-slate-50">
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Tìm kiếm"
                    className=" w-full outline-none px-2 bg-slate-50"
                />
                <svg xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6">
                    <path stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <div className="">
                {activeMenu === 'Chờ Xác Nhận' && <Waitforconfirmation />}
                {activeMenu === 'Chờ Lấy Hàng' && <WaitingForGoods />}
                {activeMenu === 'Chờ Giao Hàng' && <WaitingForDelivery />}
                {activeMenu === 'Đã Hủy' && <Canceled />}
                {activeMenu === 'Hoàn Thành' && <Complete />}
                {activeMenu === 'Trả Hàng / Hoàn Tiền' && <RefundRetunr />}
            </div>
        </>
    )
}

export default Order_All