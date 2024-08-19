
export default function Items_order({ product }: any) {
    return (
        <div className="flex flex-row gap-4 py-[12px] w-full">
            <div className="basis-24">
                <img src={product?.productId?.image_product} className="w-full h-[80px] " alt="" />
            </div>
            <div className="pr-2 basis-full">
                <h2 className="w-full text-sm lg:text-[16px]">
                    {product?.productId?.name_product}
                </h2>
                <div className="flex justify-between gap-2 py-2">
                    <p className="text-xs lg:text-sm text-[#0000008a] ">
                        <p>Phân loại: <span className="font-bold">{product?.color_item} - {product?.name_size}</span> </p>
                    </p>
                    <div className="text-sm">
                        x <span>{product?.quantity}</span>
                    </div>
                </div>
                <div className="flex flex-wrap justify-end lg:justify-between gap-2">
                    <span className="border border-[#26aa99] rounded w-full lg:w-[25%] text-center text-xs lg:text-sm p-1 text-[#26aa99] order-2 lg:order-1">
                        Trả hàng miễn phí 15 ngày
                    </span>
                    <p className="flex gap-2 text-sm lg:text-[18px] text-orange-400 order-1 lg:order-2"><s className="text-black">₫45.000 </s>{product?.price_item?.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                </div>
            </div>
        </div>
    )
}
