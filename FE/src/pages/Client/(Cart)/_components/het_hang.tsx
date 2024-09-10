
export default function Het_hang({ dataProps }: any) {
    let quantity_attr: number = 0;
    if (dataProps?.productId?.attributes) {
        const x = dataProps?.productId?.attributes?.values?.find((a: any) => a?.color?.toString() == dataProps?.color_item?.toString());
        const y = x?.size?.find((b: any) => b?.name_size?.toString() === dataProps?.name_size?.toString())
        if (x && y) {
            quantity_attr = y?.stock_attribute
        }
    }
    else {
        quantity_attr = dataProps?.id_item?.stock
    }
    return (
        <>
            {quantity_attr < 1 ? (
                <div className="absolute top-0 z-[9] w-full bg-[#37415190] h-full grid place-items-center after:absolute after:w-[120%] after:-right-[120%] after:top-0 
    before:absolute after:h-full after:bg-gradient-to-r from-[#37415190] to-[#37415111] before:w-1/2 before:h-full before:bg-[#37415188] before:-left-1/2">
                    <span className="text-gray-100 text-base">Hết hàng</span>
                </div>
            ) : quantity_attr < dataProps?.quantity ? (
                <div className="absolute top-0 z-[9] w-full bg-[#37415190] h-full grid place-items-center after:absolute after:w-[120%] after:-right-[120%] after:top-0 
    before:absolute after:h-full after:bg-gradient-to-r from-[#37415190] to-[#37415111] before:w-1/2 before:h-full before:bg-[#37415188] before:-left-1/2">
                    <span className="text-gray-100 text-base">Số lượng sản phẩm trong kho không đủ</span>
                </div>
            ) : null}
        </>

    )
}
