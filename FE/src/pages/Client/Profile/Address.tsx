import { useState } from "react"


const Address = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleToggle = () => {
        setIsOpen(!isOpen)
    }
    const [isOpenUpdate, setIsOpenUpdate] = useState(false)
    const handleToggleUpdate = () => {
        setIsOpenUpdate(!isOpenUpdate)
    }
    return (
        <>
            <div>
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h1>Địa chỉ của tôi</h1>
                    <button className="flex items-center gap-2 bg-black text-white px-3 py-3 rounded-md text-sm" onClick={handleToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span className="hidden lg:block">Thêm địa chỉ mới</span>
                    </button>
                </div>
                <div className="px-5 py-4">
                    <h2 className="py-2">Địa chỉ</h2>
                    <div className="flex justify-between items-center my-5 border-b pb-6">
                        <div className="py-1">
                            <h1>Dương Hải Nam <span className="px-2 text-gray-400">|</span> <span className="text-gray-400">(+84) 357219736</span></h1>
                            <span className="text-gray-400">Thôn A <br /> Đồng Ý, Bắc Sơn, Lạng Sơn</span>
                            <div className="flex gap-3 mt-3">
                                <button className="border border-stone-300 text-gray-400 px-4 py-2 rounded-md text-sm">Mặc định</button>
                            </div>
                        </div>
                        <div className="">
                            <div className="hidden lg:block">
                                <div className="flex gap-2 justify-end text-blue-400 py-2">
                                    <a href="#" onClick={handleToggleUpdate}>Cập nhật</a>
                                    <button>Xóa</button>
                                </div>
                                <button className="border px-4 py-2 rounded-md text-sm text-gray-400">Thiết lập mặc định</button>
                            </div>
                            <div className="block lg:hidden" onClick={handleToggleUpdate}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-5 border rounded-lg relative w-[400px] lg:w-[500px]">
                        <h1 className="py-3 text-center font-medium">Địa chỉ mới</h1>
                        <form action="">
                            <div className="*:w-full *:border *:px-2 *:py-2 *:outline-none flex gap-3 my-3">
                                <input type="text" placeholder="Họ và tên" />
                                <input type="text" placeholder="Số điện thoại" />
                            </div>
                            <div className="my-3 *:px-2 *:py-2 *:border *:outline-none">
                                <input type="text" className="w-full" placeholder="Tỉnh/Thành phố,Quận/Huyện, Phường/Xã" />
                            </div>
                            <div className="my-3 *:px-2 *:py-2 *:border *:outline-none">
                                <input type="text" className="w-full" placeholder="Địa chỉ cụ thể" />
                            </div>
                            <div className="my-3">
                                <p>Loại địa chỉ:</p>
                                <div className="flex gap-4 *:border *:px-3 *:py-2 my-2">
                                    <button type="button">Nhà riêng</button>
                                    <button type="button">Văn phòng</button>
                                </div>
                            </div>
                            <div className="my-3 flex items-center gap-3">
                                <input type="radio" /> <span>Đặt làm mặc định</span>
                            </div>
                            <div className="flex justify-center pt-5 *:w-full">
                                <button type="submit" className="bg-black text-white px-4 py-3 rounded-md">Hoàn Thành</button>
                            </div>
                        </form>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={handleToggle}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>
                </div>
            )}
            {isOpenUpdate && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
                    <div className="bg-white p-5 border rounded-lg relative w-[400px] lg:w-[500px]">
                        <h1 className="py-3 text-center font-medium">Cập nhật địa chỉ</h1>
                        <form action="">
                            <div className="*:w-full *:border *:px-2 *:py-2 *:outline-none flex gap-3 my-3">
                                <input type="text" placeholder="Họ và tên" />
                                <input type="text" placeholder="Số điện thoại" />
                            </div>
                            <div className="my-3 *:px-2 *:py-2 *:border *:outline-none">
                                <input type="text" className="w-full" placeholder="Tỉnh/Thành phố,Quận/Huyện, Phường/Xã" />
                            </div>
                            <div className="my-3 *:px-2 *:py-2 *:border *:outline-none">
                                <input type="text" className="w-full" placeholder="Địa chỉ cụ thể" />
                            </div>
                            <div className="my-3">
                                <p>Loại địa chỉ:</p>
                                <div className="flex gap-4 *:border *:px-3 *:py-2 my-2">
                                    <button type="button">Nhà riêng</button>
                                    <button type="button">Văn phòng</button>
                                </div>
                            </div>
                            <div className="my-3 flex items-center gap-3">
                                <input type="radio" /> <span>Đặt làm mặc định</span>
                            </div>
                            <div className="flex justify-center gap-3 pt-5 *:w-full">
                                <button type="submit" className="bg-black text-white px-4 py-3 rounded-md block lg:hidden">Xóa</button>
                                <button type="submit" className="bg-black text-white px-4 py-3 rounded-md">Cập nhật</button>

                            </div>
                        </form>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={handleToggleUpdate}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                        </button>

                    </div>
                </div>
            )}
        </>
    )
}

export default Address
