import { Button, Popconfirm } from "antd";
import { Query_Order } from "../../../_lib/React_Query/Orders/Query"
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import { CheckCircle2 } from "lucide-react";
import Items_order from "./_Components/items_order";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function List_order() {
    const [searchParams, setSearchParams] = useSearchParams();
    function status_item(status: string | number) {
        switch (+status) {
            case 1:
                return <span>Chờ xác nhận</span>
            case 2:
                return <span>Đang chuẩn bị</span>
            case 3:
                return <span>Đang vận chuyển</span>
            case 4:
                return <span className="text-green-500 flex items-center gap-x-2"><CheckCircle2 className="h-5" /> Hoàn thành</span>
            case 5:
                return <span className="text-red-500">ĐÃ HỦY</span>
            default: return;
        }
    }


    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    function handle_status_order(i: number) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('_page', '1');
        newParams.set('_limit', '10');
        newParams.set('_status', String(i));
        setSearchParams(newParams);
    }
    const [searchParamsUri] = useSearchParams();
    const status_order = searchParamsUri.get('_status');
    const dataClient = {
        id_user: userId,
        page: 1,
        limit: 20,
        status : +status_order
    }

    const menuItems = [
        "Tất Cả",
        "Chờ Xác Nhận",
        "Đang Chuẩn Bị Hàng",
        "Đang Vận Chuyển",
        "Hoàn Thành",
        "Đã Hủy",
    ];

    // hủy đơn
    // yêu cầu hủy
    // đã nhận hàng
 

    const { data, isLoading } = Query_Order(dataClient);
    return (
        <div>
            <ul className="hidden_scroll-x_trendingproducts overflow-x-scroll flex items-center *:border-b-2 *:cursor-pointer *:border-white justify-between gap-3 *:whitespace-nowrap lg:text-sm text-xs">
                {menuItems.map((menu, i) => (
                    <li
                        key={menu}
                        className={`px-3 py-3 hover:border-b-2 hover:border-yellow-400`}
                        onClick={() => handle_status_order(i)}
                    >
                        {menu}
                    </li>
                ))}
            </ul>
            {
                data?.data?.docs?.map((items: any) => {
                    console.log(items)
                    return (<div className="border-t py-4">
                        {status_item(items?.status)}
                        {
                            items?.items.map((product: any) => {
                                return (<Items_order product={product} />)
                            })
                        }
                        <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full py-4 px-2 justify-between">
                            <p className="text-[#0000008A] text-[12px]">
                                Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                                được giao đến bạn và sản phẩm nhận được không có vấn
                                đề nào.
                            </p>
                            {
                                items?.status === '1' ?
                                    <Popconfirm
                                        title="Mua lại đơn hàng?"
                                        description="Bạn có chắc chắn muốn mua lại không?"
                                        // onConfirm={() => addCart(item?._id)}
                                        // onCancel={cancel}
                                        okText="Có "
                                        cancelText="Không"
                                    >
                                        <Button className="bg-red-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-red-700 hover:!border-red-700 hover:!text-gray-100">
                                            Hủy
                                        </Button>
                                    </Popconfirm> :
                                    items?.status === '2' ?
                                        <Popconfirm
                                            title="Mua lại đơn hàng?"
                                            description="Bạn có chắc chắn muốn mua lại không?"
                                            // onConfirm={() => addCart(item?._id)}
                                            // onCancel={cancel}
                                            okText="Có "
                                            cancelText="Không"
                                        >
                                            <Button className="bg-red-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-red-700 hover:!border-red-700 hover:!text-gray-100">
                                                Yêu cầu hủy
                                            </Button>
                                        </Popconfirm> :
                                        items?.status === '3' ?
                                            <Popconfirm
                                                title="Mua lại đơn hàng?"
                                                description="Bạn có chắc chắn muốn mua lại không?"
                                                // onConfirm={() => addCart(item?._id)}
                                                // onCancel={cancel}
                                                okText="Có "
                                                cancelText="Không"
                                            >
                                                <Button className="bg-red-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-red-700 hover:!border-red-700 hover:!text-gray-100">
                                                    Đã nhận hàng
                                                </Button>
                                            </Popconfirm> :
                                            items?.status === '4' ?
                                                <div className="flex gap-x-2">
                                                    <Popconfirm
                                                        title="Mua lại đơn hàng?"
                                                        description="Bạn có chắc chắn muốn mua lại không?"
                                                        // onConfirm={() => addCart(item?._id)}
                                                        // onCancel={cancel}
                                                        okText="Có "
                                                        cancelText="Không"
                                                    >
                                                        <Button className="bg-red-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-red-700 hover:!border-red-700 hover:!text-gray-100">
                                                            Mua lại
                                                        </Button>
                                                    </Popconfirm>
                                                    <Button className="bg-green-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-green-700 hover:!border-green-700 hover:!text-gray-100">
                                                        Đánh giá
                                                    </Button>
                                                </div>
                                                :
                                                <Popconfirm
                                                    title="Mua lại đơn hàng?"
                                                    description="Bạn có chắc chắn muốn mua lại không?"
                                                    // onConfirm={() => addCart(item?._id)}
                                                    // onCancel={cancel}
                                                    okText="Có "
                                                    cancelText="Không"
                                                >
                                                    <Button className="bg-red-500 !w-auto h-10 lg:w-[30%] text-white text-[12px] rounded hover:!bg-red-700 hover:!border-red-700 hover:!text-gray-100">
                                                        Mua lại
                                                    </Button>
                                                </Popconfirm>
                            }
                        </div>
                    </div>)
                })
            }
        </div >
    )
}
