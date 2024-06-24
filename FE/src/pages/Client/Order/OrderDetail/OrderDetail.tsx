import { useState } from "react";

const OrderDetail = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleTogggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div className="mt-24">
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex space-x-5">
          <div className="basis-28 lg:basis-3/12  bg-[#F5F5F5]">
            <div className="lg:flex gap-4 pt-[15px] px-3 pb-[15px] border-b-2 ">
              <div className="flex justify-center">
                <img
                  className="w-[46px] h-[46px] rounded-full"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
              </div>
              <div className="">
                <h3 className="text-[#333] text-[12px] lg:text-[16px] font-semibold text-center py-1">Dương Hải Nam</h3>
                <a
                  href=""
                  className="text-[#9B9B9B] text-[12px] lg:text-sm flex items-center justify-center font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#9B9B9B"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-pencil pr-[3px] lg:block hidden"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Sửa Hồ Sơ
                </a>
              </div>
            </div>
            <div className="px-3">
              <ul className="mb-12 *:my-4">
                <li>
                  <a href="#" onClick={handleTogggle} className="flex justify-center lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-circle-user"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
                    </svg>
                    <p className="hidden lg:block" >Tài khoản của tôi</p>
                  </a>
                  {isOpen && (
                    <ul className="pt-2">
                      <li><a href="#" className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Hồ sơ</a></li>
                      <li><a href="#" className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Địa chỉ</a></li>
                      <li><a href="#" className="flex justify-center lg:justify-start lg:ml-10 text-sm text-center text-[#7D7D7D] py-1">Đổi mật khẩu</a></li>
                    </ul>
                  )}
                </li>
                <li>
                  <a href="#" className="flex justify-center  lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-clipboard-list"
                    >
                      <rect
                        width="8"
                        height="4"
                        x="8"
                        y="2"
                        rx="1"
                        ry="1"
                      />
                      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                      <path d="M12 11h4" />
                      <path d="M12 16h4" />
                      <path d="M8 11h.01" />
                      <path d="M8 16h.01" />
                    </svg>
                    <p className="hidden lg:block" >Đơn hàng của tôi</p>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex justify-center  lg:flex lg:justify-start lg:gap-4 *:text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0145AD"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <p className="hidden lg:block" >Đăng xuất</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="basis-full">
            <div className="border-2 rounded-md flex  max-h-[75px] px-[24px] ">
              <button className="flex space-x-1 justify-start items-center  py-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#757575"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-left"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="text-[#757575] text-[16px]">Trở lại</span>
              </button>
              <div className="flex ml-auto items-center ">
                <span className="text-black text-[16px] pl-[10px]">
                  MÃ ĐƠN HÀNG. 240518N4EUP35Q
                </span>
                <span className="px-[10px]">|</span>
                <div className="mt-[2px]">
                  <a href="#" className="text-[#f68e56] text-[16px]">
                    GIAO HÀNG THÀNH CÔNG
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-[#FFFBF8]">
              <div className="flex items-center px-[24px] py-[12px] border-b-[1px] rounded-md">
                <div className="w-[60%] justify-start">
                  <span className="text-[12px] text-[#757575]">
                    Hãy kiểm tra cẩn thận tất cả các sản phẩm trong đơn hàng
                    trước khi bấm "Đã nhận được hàng". Giao nhanh đúng hẹn: nhận
                    Voucher ₫15.000 nếu đơn hàng được giao đến bạn sau ngày
                    21-05-2024.
                  </span>
                </div>
                <div className="w-[40%] flex justify-end ">
                  <button className="btn_status rounded-sm px-[10px] py-[10px] text-white">
                    Đã Nhận Hàng
                  </button>
                </div>
              </div>
              <div className=" items-center px-[24px] py-[12px] border-b-[1px] rounded-md">
                <div className="flex justify-end ">
                  <button className="btn_orderdetail rounded-sm px-[10px] py-[10px] text-white">
                    Yêu Cầu Trả Hàng/Hoàn Tiền
                  </button>
                </div>
              </div>
              <div className=" items-center px-[24px] py-[12px] border-b-[4px] border-dashed rounded-md">
                <div className="flex justify-end ">
                  <button className="btn_orderdetail rounded-sm px-[10px] py-[10px] text-white">
                    Liên Hệ Người Bán
                  </button>
                </div>
              </div>
            </div>
            <div className="pt-[12px] px-[24px]">
              <div className="flex justify-between ">
                <div className="flex justify-start">
                  <h2 className="text-[20px]">Địa Chỉ Nhận Hàng</h2>
                </div>

                <div className="flex flex-col items-end text-[#757575] text-[12px]">
                  <span>SPX Express</span>
                  <span>SPXVN043123953865</span>
                </div>
              </div>
              <div className="flex">
                <div className="max-w-[40%] border-r-[1px] border-[#D8D8D8]">
                  <div className="pt-[10px] pr-[24px]">
                    <div className="">
                      <h3 className="text-[16px] mb-[7px]">Kiều Bảo Chung</h3>
                    </div>
                    <div className="">
                      {" "}
                      <span className="text-[14px] text-[#0000008A]">
                        (+84) 359774443
                      </span>
                    </div>
                    <div className="">
                      <span className="text-[14px] text-[#0000008A]">
                        27 Ngách 6/59 Hẻm 6/59/10 Miêu Nha, Tdp Số 2, Phường Tây
                        Mỗ, Quận Nam Từ Liêm, Hà Nội
                      </span>
                    </div>
                  </div>
                </div>
                <div className="max-w-[60%] pt-[4px] pl-[12px] pb-[12px]">
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#26AA99] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        14:49 20-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Giao hàng thành công
                      </div>
                      <a href="" className="text-[14px] text-[#0055AA]">
                        Xem hình ảnh giao hàng.
                      </a>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        07:25 20-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        07:25 20-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng sẽ sớm được giao, vui lòng chú ý điện thoại
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        23:01 19-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng đã đến trạm giao hàng 20-HNI Tu Liem 2 Hub
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        19:48 19-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng đã rời kho phân loại
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        14:55 19-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng đã đến kho phân loại BN B Mega SOC
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[24px] pt-[5px]">
                      <div className="rounded-full mx-auto bg-[#D8D8D8] w-[11px] h-[11px]"></div>
                    </div>
                    <div className="max-w-[150px]">
                      <div className="text-[14px] pr-[12px]">
                        13:34 19-05-2024
                      </div>
                    </div>
                    <div className="max-w-[398px]">
                      <div className="text-[14px] text-[#0000008A]">
                        Đơn hàng đã rời bưu cục
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item_order bg-white rounded-md my-[20px] ">
                <div className=" ">
                  <div className="flex pb-[12px] border-b-2 justify-between">
                    <div className="justify-start items-center ">
                      <a
                        href=""
                        className="px-[10px] py-[5px] bg-[#222222] text-white text-[14px]"
                      >
                        Xem ngay
                      </a>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex py-[12px] w-full">
                      <div className="w-[85%] flex">
                        <div className="">
                          <img
                            src="https://picsum.photos/81/81"
                            alt=""
                            className="max-w-[81px] max-h-[81px]"
                          />
                        </div>
                        <div className="pl-[12px]">
                          <h2 className="text-[16px]">
                            THẢM LÓT CHÂN XE VISION HÀNG CAO CẤP Đời 2014-2024
                          </h2>
                          <span className="text-[14px] mb-[5px] text-[#0000008A]">
                            Phân loại hàng: Thảm 2021-2024
                          </span>
                          <div className="text-[14px] mb-[5px]">
                            x <span>1</span>
                          </div>
                          <span className="border-2 text-[12px] p-1 text-[#26aa99] border-[#26aa99]">
                            Trả hàng miễn phí 15 ngày
                          </span>
                        </div>
                      </div>

                      <div className="flex w-[15%] justify-end items-center ">
                        <span className="line-through text-[#0000008A] px-[10px]">
                          ₫65.000
                        </span>
                        <span className="text-[#ee4d2d]">₫45.000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className=" flex justify-end border-y-[1px] border-dashed border-[#eaeaea] ">
                <div className="py-[10px] border-r-[1px] border-dashed">
                  <span className="text-[14px] text-[#0000008A] pr-[10px] ">
                    Tổng tiền hàng
                  </span>
                </div>
                <div className="w-[240px] py-[10px] text-end text-[14px]">
                  <span className="pr-[24px]">₫45.000</span>
                </div>
              </div>
              <div className=" flex justify-end border-y-[1px] border-dashed border-[#eaeaea] ">
                <div className="py-[10px] border-r-[1px] border-dashed">
                  <span className="text-[14px] text-[#0000008A] pr-[10px] ">
                    Phí vận chuyển
                  </span>
                </div>
                <div className="w-[240px] py-[10px] text-end text-[14px]">
                  <span className="pr-[24px]">₫18.300</span>
                </div>
              </div>
              <div className=" flex justify-end border-y-[1px] border-dashed border-[#eaeaea] ">
                <div className="py-[10px] border-r-[1px] border-dashed">
                  <span className="text-[14px] text-[#0000008A] pr-[10px] ">
                    Giảm giá phí vận chuyển
                  </span>
                </div>
                <div className="w-[240px] py-[10px] text-end text-[14px]">
                  <span className="pr-[24px]">-₫14.800</span>
                </div>
              </div>
              <div className=" flex justify-end border-y-[1px] border-dashed border-[#eaeaea] ">
                <div className="py-[10px] border-r-[1px] border-dashed">
                  <span className="text-[14px] text-[#0000008A] pr-[10px] ">
                    Thành tiền
                  </span>
                </div>
                <div className="w-[240px] py-[10px] text-end text-[24px]">
                  <span className="pr-[24px] text-[#f68e56]">₫45.000</span>
                </div>
              </div>
            </div>
            <div className="border-[1px] border-[#FFBF00]  bg-[#FFFDF7] my-[10px]">
              <div className="px-[24px] text-[14px] py-[10px] text-[#0000008A]">
                Vui lòng thanh toán{" "}
                <span className="text-[#f68e56]">₫48.500</span> khi nhận hàng.
              </div>
            </div>
            <div className=" flex justify-end rounded-sm bg-[#FAFAFA] ">
              <div className="py-[10px] border-r-[1px] border-dashed">
                <span className="text-[14px] text-[#0000008A] pr-[10px] ">
                  Phương thức Thanh toán
                </span>
              </div>
              <div className="w-[240px] py-[10px] text-end text-[14px]">
                <span className="pr-[24px]">Thanh toán khi nhận hàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
