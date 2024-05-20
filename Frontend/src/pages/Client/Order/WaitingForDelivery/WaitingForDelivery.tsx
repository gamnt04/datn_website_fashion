import React from "react";
import "./style.css";
const WaitingForDelivery = () => {
  return (
    <div>
      <div className="container mx-auto max-w-[1200px] ">
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-[81%] bg-[#F5F5F5]">
            <section className="flex  bg-white shadow-gray rounded ">
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Tất Cả
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Chờ Thanh Toán
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Vận Chuyển
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Chờ Giao Hàng <span>(2)</span>
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Hoàn Thành
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Đã Hủy
              </a>
              <a
                href=""
                className="link_menu flex-1 text-center p-4 bg-gray-200 hover:bg-gray-300"
              >
                Trả Hàng / Hoàn Tiền
              </a>
            </section>
            <div className="">
              <div className="item_order bg-white rounded-md my-[20px] ">
                <div className="px-[24px] py-[12px] ">
                  <div className="flex pb-[12px] border-b-2 justify-between">
                    <div className="justify-start items-center ">
                      <a
                        href=""
                        className="px-[10px] py-[5px] bg-[#222222] text-white text-[14px]"
                      >
                        Xem ngay
                      </a>
                    </div>
                    <div className="flex justify-end ">
                      <a href="" className="flex">
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
                        <span className="text-[#26aa99] text-[16px] pl-[10px]">
                          Đơn hàng đã rời bưu cục
                        </span>
                      </a>

                      <span className="px-[10px]">|</span>
                      <div className="mt-[2px]">
                        <a href="" className="text-[#f68e56] text-[16px] ">
                          CHỜ ĐANG GIAO HÀNG
                        </a>
                      </div>
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
                    <div className="py-[20px] flex justify-end items-center border-t-2 border-[#eaeaea] ">
                      <div className="flex">
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
                        <span className="px-[5px]"> Thành tiền :</span>
                      </div>
                      <div className="text-[#f68e56]  ">
                        <span className="text-[24px] text-[#f68e56]">
                          ₫48.500
                        </span>
                      </div>
                    </div>
                    <div className="flex w-full pb-[24px]">
                      <div className="w-[40%]">
                        <span className="text-[#0000008A] text-[12px]">
                          Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng đã
                          được giao đến bạn và sản phẩm nhận được không có vấn
                          đề nào.
                        </span>
                      </div>
                      <div className="w-[60%] flex justify-end space-x-[10px]">
                        <button className="btn_recevi text-white">
                          Đã Nhận Hàng
                        </button>
                        <button className="btn ">
                          Yêu Cầu Trả Hàng/Hoàn Tiền
                        </button>
                        <button className="btn">Liên Hệ Người Bán</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDelivery;
