import { useContext, useEffect, useState } from 'react'
import Canceled from '../Canceled/Canceled';
import Complete from '../Complete/Complete';
import WaitingForDelivery from '../WaitingForDelivery/WaitingForDelivery';
import Waitforconfirmation from '../Waitforconfirmation/Waitforconfirmation';
import WaitingForGoods from '../WaitingForGoods/WaitingForGoods';
import useLocalStorage from '../../../../common/hooks/Storage/useStorage';
import { List_One_Order_User } from '../../../../common/hooks/Order/querry_Order';
import axios from 'axios';
import { message } from 'antd';
import queryString from 'query-string';
import instance from '../../../../configs/axios';
import LoadingOverlay from 'react-loading-overlay-ts';
import { LoadingContext } from './LoadingContext';


const Order_All = () => {
    const [activeMenu, setActiveMenu] = useState('Chờ Xác Nhận');
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, refetch } = List_One_Order_User(userId);
    const [messageApi, contextHolder] = message.useMessage();
    const {setActive} = useContext(LoadingContext)
    
    const handleMenuClick = (menu: any) => {
        setActiveMenu(menu);
    };
    useEffect(() => {
        refetch()
    }, [userId])
    const fiterOrrder = (status: string) => {
        return data?.filter((orders: any) => orders.status === status);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parsed = queryString.parseUrl(location.search);
                // console.log(parsed.query.vnp_TransactionStatus);

                if (parsed.query.vnp_TransactionStatus === '00') {
                    
                    
                    const itemOrder = sessionStorage.getItem('item_order');
                    const customerInfo = sessionStorage.getItem('customerInfo');

                    if (itemOrder && customerInfo) {
                        const getItemOrder = JSON.parse(itemOrder);
                        // console.log(getItemOrder);
                        
                        const dataForm = JSON.parse(customerInfo);
                        setActive(true)
                        const response = await instance.post('/orderspayment', {
                            userId: getItemOrder.userId,
                            items: getItemOrder?.items,
                            customerInfo: {
                                ...dataForm
                            },
                            totalPrice: Number(parsed.query.vnp_Amount) / 100,
                            status: '2',
                        });
                        
                        
                        console.log(response.data);
                        if(response.data){
                            message.success('Thanh toán thành công');
                            sessionStorage.removeItem('item_order');
                            sessionStorage.removeItem('customerInfo');
                            refetch();
                        }
                    } else {
                        console.error('Item order or customer info is missing in session storage');
                    }
                }
            } catch (error) {
                console.error('Error processing payment:', error);
                message.error('Có lỗi xảy ra trong quá trình thanh toán');
            }
        };

        fetchData();
    }, [location.search]);

    
    const orderCounts: Record<string, number> = {
        'Chờ Xác Nhận': fiterOrrder('1')?.length,
        'Đang Chuẩn Bị Hàng': fiterOrrder('2')?.length,
        'Đang Vận Chuyển': fiterOrrder('3')?.length,
        'Hoàn Thành': fiterOrrder('4')?.length,
        'Đã Hủy': fiterOrrder('5')?.length,
    };

    return (
        <>
        {contextHolder}
            <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs ">
                {['Chờ Xác Nhận', 'Đang Chuẩn Bị Hàng', 'Đang Vận Chuyển', 'Hoàn Thành', 'Đã Hủy'].map((menu) => (
                    <li key={menu} className={`px-3 py-3 hover:border-b-2 hover:border-yellow-400
                        ${activeMenu === menu ? 'border-b-2 border-yellow-400' : ''}`}
                        onClick={() => handleMenuClick(menu)}
                    >
                        <a href="#">{menu} ({orderCounts[menu]})</a>
                    </li>
                ))}
            </ul>
            {/* <div>
                <form action="" className="flex items-center gap-3 py-3 px-3 my-4 bg-slate-50">
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
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6">
                        <path strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </form>
            </div> */}
            <div className="">
                {activeMenu === 'Chờ Xác Nhận' && <Waitforconfirmation dataProps={fiterOrrder('1')} />}
                {activeMenu === 'Đang Chuẩn Bị Hàng' && <WaitingForGoods dataProps={fiterOrrder('2')} />}
                {activeMenu === 'Đang Vận Chuyển' && <WaitingForDelivery dataProps={fiterOrrder('3')} />}
                {activeMenu === 'Đã Hủy' && <Canceled dataProps={fiterOrrder('5')} />}
                {activeMenu === 'Hoàn Thành' && <Complete dataProps={fiterOrrder('4')} />}
                {/* {activeMenu === 'Trả Hàng / Hoàn Tiền' && <RefundRetunr />} */}
            </div>
        </>
    )
}

export default Order_All