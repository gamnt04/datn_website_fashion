import React from "react";
import "./style.css";
const Profile = () => {
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
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-[81%] bg-[#FFFFFF] flex">
            <div className="px-9 pt-[15px]">
              <div className="border-b-2">
                <h2>Hồ Sơ Của Tôi</h2>
                <p className="pb-4 text-sm">
                  Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>
              </div>
              <div className="pt-[25px] flex">
                <div className="">
                  <form action="">
                    <table>
                      <tbody>
                        <tr>
                          <td className="pb-[50px] pt-[9px] text-sm text-right w-[135px]">
                            Tên đăng nhập
                          </td>
                          <td>
                            <div className="px-4 pb-[7px]">
                              <div className="">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder="Username"
                                  className="input-value w-[393px] h-[40px] border border-slate-400 text-[#000000] text-sm px-5"
                                />
                              </div>
                              <div className="py-2">
                                <p className="text-[#9B9B9B] text-sm leading-5  ">
                                  Tên Đăng nhập chỉ có thể thay đổi một lần.
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pb-[50px] pt-[9px] text-sm text-right w-[135px]">
                            Tên
                          </td>
                          <td>
                            <div className="px-4">
                              <div className="">
                                <input
                                  type="text"
                                  name=""
                                  id=""
                                  placeholder="Tên tài khoản"
                                  className="input-value w-[393px] h-[40px] border border-slate-400 text-[#000000] text-sm px-5"
                                />
                              </div>
                              <div className="py-2">
                                <p className="text-red-600 text-sm leading-5 ">
                                  Tên tài khoản tối thiểu 10 kí tự
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className=" pt-[13px] text-sm text-right w-[135px]">
                            Email
                          </td>
                          <td>
                            <div className="px-4  ">
                              <div className="flex pt-[13px]">
                                <p className=" text-black-600 text-sm leading-5">
                                  ch*************@gmail.com
                                </p>{" "}
                                <a
                                  href=" "
                                  className="text-sm text-sky-600 underline px-4"
                                >
                                  Thay Đổi
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr className="mt-[20px]">
                          <td className=" pt-[13px] text-sm text-right w-[135px]">
                            Số điện thoại
                          </td>
                          <td>
                            <div className="px-4 ">
                              <div className="flex pt-[13px]">
                                <a
                                  href=" "
                                  className="text-sm text-sky-600 underline "
                                >
                                  Thêm Mới
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-[13px]  text-sm text-right w-[135px]">
                            Giới Tính
                          </td>
                          <td>
                            <div className="px-4 flex space-x-4 ">
                              <div className="flex pt-[13px] ">
                                <input type="radio" className="pr-2" />
                                <p className=" text-sm pl-[5px]">Nam</p>
                              </div>
                              <div className="flex pt-[13px]">
                                <input type="radio" className="pr-2" />
                                <p className=" text-sm pl-[5px]">Nữ</p>
                              </div>
                              <div className="flex pt-[13px]">
                                <input type="radio" className="pr-2" />
                                <p className=" text-sm pl-[5px]">Khác</p>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-[13px]  text-sm text-right w-[135px]">
                            Ngày Sinh
                          </td>
                          <td>
                            <div className=" px-4 flex gap-2 pt-[20px] ">
                              <select className="border p-2 w-[125px]">
                                <option value="">Ngày</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                                <option value={1}>1</option>
                              </select>
                              <select className="border p-2 w-[125px]">
                                <option value="">Tháng</option>
                                <option value={1}>Tháng 1</option>
                                <option value={1}>Tháng 1</option>
                                <option value={1}>Tháng 1</option>
                                <option value={1}>Tháng 1</option>
                                <option value={1}>Tháng 1</option>
                              </select>
                              <select className="border p-2 w-[125px]">
                                <option value="">Năm</option>
                                <option value={2022}>2022</option>
                                <option value={2022}>2022</option>
                                <option value={2022}>2022</option>
                                <option value={2022}>2022</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td className="pt-[25px] pl-[16px]">
                            <button className="btn-save bg-[#222222] text-white px-6 py-2 rounded">
                              Lưu
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
                <div className="border-l-2 ">
                  <div className=" w-[350px] text-center">
                    <div>
                      <img
                        src="https://picsum.photos/150/150"
                        alt=""
                        className="w-[150px] h-[150px] mx-auto my-[30px] rounded-full"
                      />
                    </div>
                    <div className="mx-auto">
                      <button className="btn-add border px-5 py-1 text-[16px] rounded">
                        Thêm mới
                      </button>
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

export default Profile;
