

const Waitforconfirmation = () => {
    return (
        <>
            <div className="bg-white border-b my-4 px-2">
                <div className="flex gap-2 py-5 border-b-2 justify-between">
                    <a href="" className="px-[15px] py-[5px] bg-[#222222] text-white text-[12px] lg:text-sm">
                        Xem ngay
                    </a>
                    <div className="flex">
                        <a href="" className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#26aa99"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-truck"
                            >
                                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                                <path d="M15 18H9" />
                                <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
                                <circle cx="17" cy="18" r="2" />
                                <circle cx="7" cy="18" r="2" />
                            </svg>
                            <span className="text-[#26aa99] text-[12px] lg:text-sm pl-[10px]">
                                Chờ Xác Nhận
                            </span>
                        </a>
                    </div>
                </div>
                <div className="">
                    <div className="flex flex-row gap-4 py-[12px] w-full">
                        <div className="basis-24">
                            <img src="https://picsum.photos/81/81" className="w-full h-[80px]" alt="" />
                        </div>
                        <div className="pr-2 basis-full">
                            <h2 className="w-full text-sm lg:text-[16px]">
                                THẢM LÓT CHÂN XE VISION HÀNG CAO CẤP Đời 2014-2024
                            </h2>
                            <div className="flex justify-between gap-2 py-2">
                                <p className="text-sm text-[#0000008A]">
                                    Phân loại hàng: Thảm 2021-2024
                                </p>
                                <div className="text-[12px]">
                                    x <span>1</span>
                                </div>
                            </div>
                            <div className="flex justify-between gap-2">
                                <span className="border text-[10px] lg:text-sm p-1 text-[#26aa99] border-[#26aa99]">
                                    Trả hàng miễn phí 15 ngày
                                </span>
                                <div className="flex justify-center items-center gap-2">
                                    <p className="flex gap-2 text-sm text-orange-400"><s className="text-black">₫65.000</s>₫45.000</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="py-3 px-2 flex justify-end items-center border-t  border-b border-[#eaeaea] ">
                        <div className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#f68e56"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="lucide lucide-badge-dollar-sign"
                            >
                                <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                                <path d="M12 18V6" />
                            </svg>
                            <p>Thành tiền : <span className="text-xl text-[#f68e56]">₫48.500</span></p>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 w-full py-4">
                        <p className="basis-4/6 lg:basis-10/12 text-[#0000008A] text-[12px]">
                            Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                            được giao đến bạn và sản phẩm nhận được không có vấn
                            đề nào.
                        </p>
                        <button className="basis-2/6 lg:basis-2/12 bg-black px-2 py-2 text-white text-[12px] ">
                            Đã Nhận Hàng
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Waitforconfirmation