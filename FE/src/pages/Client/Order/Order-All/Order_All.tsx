import { useState } from 'react'
import Canceled from '../Canceled/Canceled';
import Complete from '../Complete/Complete';
import RefundRetunr from '../RefundRetunr/RefundRetunr';
import WaitingForDelivery from '../WaitingForDelivery/WaitingForDelivery';
import Waitforconfirmation from '../Waitforconfirmation/Waitforconfirmation';
import WaitingForGoods from '../WaitingForGoods/WaitingForGoods';

import useLocalStorage from '../../../../common/hooks/Storage/useStorage';
import { List_One_Order_User } from '../../../../common/hooks/Order/querry_Order';

const Order_All = () => {
    const [activeMenu, setActiveMenu] = useState('Chờ Xác Nhận');
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const handleMenuClick = (menu: any) => {
        setActiveMenu(menu);
    };
    const { data } = List_One_Order_User(userId);
    console.log(data);

    const fiterOrrder = (status: string) => {
        return data?.filter((orders: any) => orders.status === status);
    }
    console.log(fiterOrrder('Chờ xác nhận'));

    return (
        <>
            <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs ">
                {['Chờ Xác Nhận', 'Đang Chuẩn Bị Hàng', 'Đang Vận Chuyển', 'Hoàn Thành', 'Đã Hủy', 'Trả Hàng / Hoàn Tiền'].map((menu) => (
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
                {activeMenu === 'Chờ Xác Nhận' && <Waitforconfirmation dataProps={fiterOrrder('Chờ xác nhận')} />}
                {activeMenu === 'Đang Chuẩn Bị Hàng' && <WaitingForGoods dataProps={fiterOrrder('Đang chuẩn bị hàng')} />}
                {activeMenu === 'Đang Vận Chuyển' && <WaitingForDelivery dataProps={fiterOrrder('Đang vận chuyển')} />}
                {activeMenu === 'Đã Hủy' && <Canceled dataProps={fiterOrrder('Đã hủy')} />}
                {activeMenu === 'Hoàn Thành' && <Complete dataProps={fiterOrrder('Đã giao hàng')} />}
                {activeMenu === 'Trả Hàng / Hoàn Tiền' && <RefundRetunr />}
            </div>
        </>
    )
}

export default Order_All