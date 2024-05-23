import React from "react";
import "./style.css";
const OrderDetail = () => {
  return (
    <div>
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex space-x-5">
          <div className="w-[19%] bg-[#F5F5F5]">
            <div className="flex px-7 pt-[15px] pb-[15px] border-b-2">
              <div className=" px-3">
                <img
                  className="w-[46px] h-[46px] rounded-full"
                  src="https://picsum.photos/300/300"
                  alt=""
                />
              </div>
              <div className="">
                <h3 className="text-[#333] font-semibold text-sm">User Name</h3>
                <a
                  href=""
                  className=" text-[#9B9B9B] font-normal text-[14px] flex pt-[5px]  font-normal"
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
                    className="lucide lucide-pencil pr-[3px]"
                  >
                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                  Sửa Hồ Sơ
                </a>
              </div>
            </div>
            <div className="mx-auto py-[20px] pl-[40px]">
              <table className="">
                <tbody>
                  <tr>
                    <td>
                      <div className=" w-[24px]">
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
                      </div>
                    </td>
                    <td className="">
                      <a href="" className="pl-[10px] py-[10px]">
                        <span className="text-sm">Tài Khoản Của Tôi</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="">
                      <a href="" className="pl-[10px] py-[15px]">
                        <span className="text-sm text-[#7D7D7D]">Hồ Sơ</span>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td className="">
                      <a href="" className="pl-[10px] py-[15px]">
                        <span className="text-sm text-[#7D7D7D]">
                          Đổi Mật Khẩu
                        </span>
                      </a>
                    </td>
                  </tr>
                  <tr className="py-[20px]">
                    <td>
                      <div className=" w-[24px]">
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
                      </div>
                    </td>
                    <td>
                      <a href="" className="pl-[10px] ">
                        <span className="text-sm">Đơn Mua</span>
                      </a>
                    </td>
                  </tr>
                  <tr className="space-y-[20px]">
                    <td>
                      <div className=" w-[24px]">
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
                      </div>
                    </td>
                    <td>
                      <a href="" className="pl-[10px] ">
                        <span className="text-sm">Đăng Xuất</span>
                      </a>
                    </td>
                  </tr>
                  <tr className="space-y-[20px]">
                    <td>
                      <div className=" w-[24px]">
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
                          className="lucide lucide-circle-dollar-sign"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                          <path d="M12 18V6" />
                        </svg>
                      </div>
                    </td>
                    <td>
                      <a href="" className="pl-[10px] ">
                        <span className="text-sm">Ví Của Tôi</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-[81%] bg-[#FFFFFF] ">
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
            <div className="">
              <div className="flex justify-between py-[12px] px-[24px]">
                <div className="flex justify-start">
                  <h2 className="text-[20px]">Địa Chỉ Nhận Hàng</h2>
                </div>

                <div className="flex flex-col items-end text-[#757575] text-[12px]">
                  <span>SPX Express</span>
                  <span>SPXVN043123953865</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
