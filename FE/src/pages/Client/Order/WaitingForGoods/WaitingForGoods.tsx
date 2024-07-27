import { Link } from "react-router-dom";
import { IOrder } from "../../../../common/interfaces/Orders"
import { useMutation } from "@tanstack/react-query";
import { Cancel_Order } from "../../../../services/orderProduct";
import { message, Popconfirm } from "antd";
import { Car } from "../../../../components/common/Client/_component/Icons";

const WaitingForGoods = ({ dataProps }: any) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutate } = useMutation({
        mutationFn: async (id: any) => {
            const { data } = await Cancel_Order(id);
            return data;
        },
        onSuccess: () => {
            messageApi.open({
                type: "success",
                content: "Yêu cầu hủy đơn hàng thành công",
            });
        },
        onError: () => {
            messageApi.open({
                type: "error",
                content: "Yêu cầu hủy đơn hàng thất bại",
            });
        }
    })
    return (
        <>
            {!dataProps || dataProps.length === 0 ? (
                <div className="flex justify-center items-center">
                    <img src="../../src/assets/Images/Products/no-data.png" alt="Không có sản phẩm" />
                </div>
            ) : (
                <div>
                    {contextHolder}
                    {dataProps.map((item: IOrder) => (
                        <div className="bg-white shadow-xl my-4 px-2">

                            <div className="flex gap-2 py-5 border-b-2 justify-between">
                                <Link to={`/allorder/order/${item._id}/detail`} className="px-[10px] py-[5px] bg-[#222222] text-white text-[12px] lg:text-sm rounded">
                                    Xem ngay
                                </Link>
                                <div className="flex">
                                    <a href="" className="flex items-center">
                                        <Car />
                                        {Number(item.status) === 2 && (
                                            <span className="text-[12px] lg:text-sm pl-[10px] text-[#26aa99]">
                                                Đang chuẩn bị hàng
                                            </span>
                                        )}
                                    </a>
                                </div>
                            </div>

                            <div className="">
                                {item.items.map((product) => {
                                    return (<div className="flex flex-row gap-4 py-[12px] w-full">
                                        <div className="basis-24">
                                            <img src={product?.productId?.image_product} className="w-full h-[80px]" alt="" />
                                        </div>
                                        <div className="pr-2 basis-full">
                                            <h2 className="w-full text-sm lg:text-[16px]">
                                                {product?.productId?.name_product}
                                            </h2>
                                            <div className="flex justify-between gap-2 py-2">
                                                <p className="text-sm text-[#0000008A]">
                                                    <p>Phân loại: <span className="font-bold">{product?.color_item} - {product?.name_size}</span> </p>
                                                </p>
                                                <div className="text-[12px]">
                                                    x <span>{product.quantity}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between gap-2">
                                                <span className="border text-[10px] lg:text-sm p-1 text-[#26aa99] border-[#26aa99]">
                                                    Trả hàng miễn phí 15 ngày
                                                </span>
                                                <div className="flex justify-center items-center gap-2">
                                                    <p className="flex gap-2 text-sm text-orange-400"><s className="text-black">₫45.000 </s>{product?.productId?.price_product?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)
                                })}
                                <div className="py-3 px-2 flex justify-end items-center border-t  border-b border-[#eaeaea] ">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#f68e56"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-badge-dollar-sign"
                                        >
                                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                            <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                            <path d="M12 18V6" />
                                        </svg>
                                        <p>Thành tiền : <span className="text-xl text-[#f68e56]">{item.totalPrice?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-4 w-full py-4">
                                    <p className="basis-4/6 lg:basis-10/12 text-[#0000008A] text-[12px]">
                                        Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                                        được giao đến bạn và sản phẩm nhận được không có vấn
                                        đề nào.
                                    </p>
                                    <button className="basis-2/6 lg:basis-2/12 bg-red-200 px-2 py-2 text-white text-[12px] rounded">
                                        Đã Nhận Hàng
                                    </button>
                                    <Popconfirm
                                        title="Yêu cầu hủy dơn hàng?"
                                        description="Bạn có muốn yêu cầu hủy đơn hàng này?"
                                        onConfirm={() => mutate(item?._id)}
                                        // onCancel={cancel}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button className="basis-2/6 lg:basis-2/12 bg-black px-2 py-2 text-white text-[12px] rounded">
                                            Yêu cầu hủy đơn
                                        </button>
                                    </Popconfirm>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default WaitingForGoods