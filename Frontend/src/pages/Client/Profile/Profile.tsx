import React from "react";
import "./style.css";
const Profile = () => {
  return (
    <div>
      <div className="container mx-auto max-w-[1200px]">
        <div className="flex">
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
                <a className=" text-[#9B9B9B] font-normal text-xs">Sửa Hồ Sơ</a>
              </div>
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
