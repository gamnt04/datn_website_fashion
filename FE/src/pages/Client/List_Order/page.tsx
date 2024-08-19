import { Button, Popconfirm, Spin } from "antd";
import { Query_Order } from "../../../_lib/React_Query/Orders/Query"
import useLocalStorage from "../../../common/hooks/Storage/useStorage";
import Items_order from "./_Components/items_order";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Car, TotalPrice } from "../../../components/common/Client/_component/Icons";
import { useOrderMutations } from "../../../common/hooks/Order/mutation_Order";
import { Mutation_Cart } from "../../../common/hooks/Cart/mutation_Carts";
import { LoadingOutlined } from "@ant-design/icons";

export default function List_order() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { mutate: cancel, contextHolder } = useOrderMutations('CANCEL_PRODUCT');
    const { mutate: complete, contextHolder: f } = useOrderMutations('COMPLETED_PRODUCT');
    const { mutate: confirm, contextHolder: s } = useOrderMutations('REQUEST_CANCEL');
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const account = user?.user;
    const navi = useNavigate();
    const { mutate: add } = Mutation_Cart("ADD");

    function status_item(status: string | number) {
        switch (+status) {
            case 1:
                return <span>Chờ xác nhận</span>
            case 2:
                return <span>Đang chuẩn bị</span>
            case 3:
                return <span>Đang vận chuyển</span>
            case 4:
                return <span className="text-green-500 flex items-center gap-x-2"> Hoàn thành</span>
            case 5:
                return <span className="text-red-500">Đã hủy</span>
            default: return;
        }
    }

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
        status: +status_order
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
    const { data, isPending } = Query_Order(dataClient);
    const addCart = (orderId?: string | number) => {
        if (userId) {
            const order = data?.data?.docs?.find((i: any) => i?._id === orderId);
            if (order?.items) {
                for (let i = 0; i < order.items.length; i++) {
                    const j = order.items[i];
                    if (j.productId) {
                        add({
                            userId: account?._id,
                            productId: j?.productId?._id,
                            color: j?.color_item,
                            size: j?.name_size,
                            quantity: j?.quantity,
                            price_item_attr: j?.price_item,
                            image: j?.productId?.image_product,
                            name: j?.productId?.name_product,
                            _id: orderId
                        });
                    }
                };
            }
        }
        else {
            navi('/login')
        }
    };
    if (isPending) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        );
    }
    return (
        <div>
            {contextHolder}
            {f}
            {s}
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
            {!data?.data?.docs || data?.data?.docs?.length === 0 ? (

                <div className="flex justify-center items-center">
                    <img src="../../src/assets/Images/Products/no-data.png" alt="Không có sản phẩm" />
                </div>
            ) : (
                <div>
                    {data?.data?.docs?.map((items: any) => {
                        return (
                            <div className="border-t py-4">
                                <div className="flex gap-2 py-5 border-b-2 justify-between">
                                    <Link to={`/profile/order/${items._id}`} className="py-2 px-4 bg-[#222222] text-white text-[12px] lg:text-sm rounded">
                                        Xem ngay
                                    </Link>
                                    <div className="flex">
                                        <a href="" className="flex items-center gap-3">
                                            <Car />{status_item(items?.status)}
                                        </a>
                                    </div>
                                </div>
                                {items?.items.map((product: any) => {
                                    return (<Items_order product={product} />)
                                })
                                }
                                <div className="py-3 px-2 flex justify-end items-center border-t  border-b border-[#eaeaea] ">
                                    <div className="flex items-center gap-1">
                                        <TotalPrice />
                                        <p>Thành tiền : <span className="lg:text-lg text-sm text-[#f68e56]">{items.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 w-full py-4 px-2 justify-between">
                                    <p className="text-[#0000008A] text-[12px]">
                                        Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                                        được giao đến bạn và sản phẩm nhận được không có vấn
                                        đề nào.
                                    </p>
                                    {items?.status === '1' ?
                                        <div className="flex gap-3 lg:basis-3/12 w-full">
                                            <Button className="!bg-stone-300 hover:!bg-stone-400 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                                                Chờ xác nhận
                                            </Button>
                                            <Popconfirm
                                                title="Hủy dơn hàng?"
                                                description="Bạn có chắc chắn muốn hủy đơn hàng này?"
                                                onConfirm={() => cancel(items._id)}
                                                // onCancel={cancel}
                                                okText="Có "
                                                cancelText="Không"
                                            >
                                                <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">Hủy đơn hàng</Button>
                                            </Popconfirm>
                                        </div> :
                                        items?.status === '2' ?
                                            <div className="flex gap-3 lg:basis-3/12 w-full">
                                                <Button className="bg-stone-300 w-full h-10 lg:w-[50%] text-white text-[12px] rounded " disabled>
                                                    Đã Nhận Hàng
                                                </Button>
                                                {items.cancellationRequested === true ? (
                                                    <Popconfirm
                                                        title="Yêu cầu hủy dơn hàng?"
                                                        description="Bạn có muốn yêu cầu hủy đơn hàng này?"
                                                        onConfirm={() => confirm(items?._id)}
                                                        // onCancel={cancel}
                                                        okText="Có"
                                                        cancelText="Không"
                                                    >
                                                        <Button h-10 className="bg-red-500 w-full h-10 lg:w-[50%] text-white text-[12px] rounded" disabled>
                                                            Yêu cầu hủy đơn
                                                        </Button>
                                                    </Popconfirm>
                                                ) : (
                                                    <Popconfirm
                                                        title="Yêu cầu hủy dơn hàng?"
                                                        description="Bạn có muốn yêu cầu hủy đơn hàng này?"
                                                        onConfirm={() => confirm(items?._id)}
                                                        // onCancel={cancel}
                                                        okText="Có"
                                                        cancelText="Không"
                                                    >
                                                        <Button h-10 className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                                                            Yêu cầu hủy đơn
                                                        </Button>
                                                    </Popconfirm>
                                                )}
                                            </div> :
                                            items?.status === '3' ?
                                                <Button className="!bg-stone-300 hover:!bg-stone-400 w-full h-10 lg:w-[30%] !text-white text-[12px] rounded border-none" onClick={() => complete(items?._id)}>
                                                    Đã Nhận Hàng
                                                </Button> :
                                                items?.status === '4' ?
                                                    <div className="flex gap-3 lg:basis-4/12 w-full">
                                                        <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                                                            Đánh giá
                                                        </Button>
                                                        <Button className="!bg-stone-300 hover:!bg-stone-400 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                                                            Đã Nhận Hàng
                                                        </Button>
                                                        <Popconfirm
                                                            title="Mua lại đơn hàng?"
                                                            description="Bạn có chắc chắn muốn mua lại không?"
                                                            onConfirm={() => addCart(items?._id)}
                                                            // onCancel={cancel}
                                                            okText="Có "
                                                            cancelText="Không"
                                                        >
                                                            <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[50%] !text-white text-[12px] rounded border-none">
                                                                Mua Lại
                                                            </Button>
                                                        </Popconfirm>

                                                    </div>
                                                    :
                                                    <Popconfirm
                                                        title="Mua lại đơn hàng?"
                                                        description="Bạn có chắc chắn muốn mua lại không?"
                                                        onConfirm={() => addCart(items?._id)}
                                                        // onCancel={cancel}
                                                        okText="Có "
                                                        cancelText="Không"
                                                    >
                                                        <Button className="bg-red-500 hover:!bg-red-600 w-full h-10 lg:w-[30%] !text-white text-[12px] rounded border-none">
                                                            Mua Lại
                                                        </Button>
                                                    </Popconfirm>
                                    }
                                </div>
                            </div>)
                    })}
                </div>
            )}


        </div >
    )
}